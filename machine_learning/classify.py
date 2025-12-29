import sys
import json
import pandas as pd
import os

from lib.pre_processing import pre_processing
from lib.extraksi_fitur import extraksi_fitur
from lib.analisis_sentiment_en import analisis_sentiment

def classify():
    # Ambil data dari server
    # data ini berupa nama file yang sudah di simpan
    try:
        data_from_server = sys.stdin.read()
        input_obj = json.loads(data_from_server)
        file_name = input_obj.get("dataset_name_file")
    except Exception as e:
        error_result = {
            "status": "error",
            "message": f"Failed to get data from 'ML': {e}"
        }

        print(json.dumps(error_result))
        sys.exit(1)

    # Baca file dalam bentuk CSV menggunakan pandas
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Karena file tweets-data berada di dalam folder yang sama dengan script
    file_path = os.path.join(current_dir, "tweets-data", file_name)
    
    df = pd.read_csv(file_path, delimiter=',')

    try:

        # Pre-Processing
        clean_df = pre_processing(df)
        # Klasifikasi sentimen
        labeled_df = analisis_sentiment(clean_df)
        # Extraksi-Fitur [Hitung Matrix]
        fitur_stats = extraksi_fitur(labeled_df)


        # Menghitung total data
        total_tweets = len(labeled_df)

        # Menghitung statistik sentimen
        stats_sentiment = labeled_df["sentiment"].value_counts().to_dict()

        # Mengambil 10 data pertama untuk preview
        labeled_df_preview = labeled_df[["clean_text", "sentiment", "polarity", "created_at", "tweet_url"]].head(12)
        # Mengubah 10 data preview menjadi to_dict agar bisa di kirim
        labeled_df_preview_list = labeled_df_preview.to_dict('records')


        # Kumpulkan semua data untuk di kembalikan ke server
        final_output = {
            "file_name": file_name,
            "total_tweets": total_tweets,
            "stats_sentiment": stats_sentiment,
            "fitur_ekstraksi": {
                "jumlah_fitur_tfidf": fitur_stats["total_tf_idf"],
                # Mengakses elemen tuple (baris, kolom) untuk tampilan yang lebih rapi
                "bentuk_matrix": f"{fitur_stats['matrix_tf_idf'][0]} dokumen x {fitur_stats['matrix_tf_idf'][1]} fitur",
                # Mengubah array numpy ke list Python agar mudah di-JSON-kan
                "top_10_fitur": fitur_stats["example_fitur"].tolist()
            },
            "data_preview": labeled_df_preview_list
        }

        print(json.dumps(final_output))
    except Exception as err:
        error_response = {
            "status": "failed", 
            "message": f"Process classification failed: {str(err)}"
        }

        print(json.dumps(error_response))

if __name__ == "__main__":
    classify()