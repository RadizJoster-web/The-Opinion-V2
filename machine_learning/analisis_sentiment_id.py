from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import pandas as pd

# 1. Tentukan Model dan Tokenizer
# Menggunakan model IndoBERT yang sudah disetel (fine-tuned) untuk Sentimen
MODEL_NAME = "indobenchmark/indobert-base-p1-finetuned-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Pastikan perangkat (device) yang digunakan: GPU jika tersedia, jika tidak CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Mendefinisikan label berdasarkan output model
# Model ini biasanya menghasilkan indeks 0, 1, 2. Kita petakan ke label sentimen.
LABEL_MAP = {
    0: "Positif",
    1: "Netral",
    2: "Negatif"
}

def get_sentiment(text):
    """
    Melakukan analisis sentimen menggunakan model IndoBERT.
    """
    # Mengkodekan teks
    encoded_input = tokenizer(
        text,
        return_tensors='pt',
        truncation=True,
        padding=True,
        max_length=128 # Batasan panjang input
    ).to(device) # Pindahkan ke device (CPU/GPU)

    # Melakukan inferensi (prediksi)
    with torch.no_grad():
        output = model(**encoded_input)

    # Mengambil indeks dengan skor tertinggi (logits)
    # Logits adalah skor mentah dari model.
    logits = output.logits
    prediction = torch.argmax(logits, dim=1).item()

    # Mengambil probabilitas (opsional, untuk melihat keyakinan model)
    probabilities = torch.softmax(logits, dim=1).squeeze().tolist()

    # Mengembalikan label sentimen
    sentiment = LABEL_MAP[prediction]

    # Mengembalikan label dan probabilitas
    return sentiment, probabilities[prediction]


def analisis_sentiment_indobert(df, text_column="clean_text"):
    """
    Menerapkan analisis sentimen IndoBERT ke seluruh DataFrame.
    """
    print("Mulai analisis sentimen dengan IndoBERT...")

    # Menerapkan fungsi ke kolom teks
    results = df[text_column].apply(
        lambda x: get_sentiment(str(x))
    )

    # Memisahkan hasil menjadi dua kolom baru
    df["sentiment_indobert"] = [r[0] for r in results]
    df["confidence_indobert"] = [r[1] for r in results]

    print("Analisis selesai!")
    return df