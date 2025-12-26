import pandas as pd
import sys
import json

import pre_processing
import extraksi_fitur
import server.machine_learning.analisis_sentiment_en as analisis_sentiment_en

# Take data from node
data_from_node = sys.stdin.read()

def main():
    try:
        input_obj = json.loads(data_from_node)

        # CORRECTED: Access the parameters directly from the loaded object
        file_name = input_obj.get("file_name")

    except Exception as e:
        error_result = {
        "status": "error",
        "message": f"Python script failed: {e}"
        }
        
        print(json.dumps(error_result)) 
        sys.exit(1)

    # setup path
    file_path = f"./tweets-data/{file_name}"

    # Read the cvs file as pandas module
    df = pd.read_csv(file_path, delimiter=",")

    # 2. PRE-PROCESSING
    # Assume pre_processing returns the DataFrame with 'clean_text'
    clean_data = pre_processing.pre_processing(df) 

    # 3. SENTIMENT ANALYSIS
    # Capturing the returned DataFrame with new 'Sentimen' dan 'Polarity' columns
    labeled_data = analisis_sentiment_en.analisis_sentiment(clean_data)
    
    # 4. FEATURE EXTRACTION (TF-IDF)
    # X is the sparse numerical matrix
    feature_stats = extraksi_fitur.extraksi_fitur(labeled_data)
    
    # ------------------------------------------------------------
    # 5. FINAL RESULTS GENERATION (PENTING UNTUK NODE.JS)
    # ------------------------------------------------------------
        
    # Ambil data esensial untuk dikirim kembali
    # Membuat summary statistik
    sentiment_summary = labeled_data["sentiment"].value_counts().to_dict()
    
    # Ambil 5 baris data berlabel untuk preview
    labeled_data_preview = labeled_data[["clean_text", "sentiment", "polarity", "created_at", "tweet_url"]].head(10)

    # Jika Anda ingin mengembalikan semua data, gunakan: labeled_data.to_dict('records')
    labeled_data_preview_list = labeled_data_preview.to_dict('records')
    
    final_output = {
        "status": "success",
        "message": "Pipeline Executed Successfully. Data is ready.",
        "total_tweets": len(labeled_data),
        "sentiment_summary": sentiment_summary,
        "fitur_ekstraksi_info": {
            "jumlah_fitur_tfidf": feature_stats["total_tf_idf"],
            # Mengakses elemen tuple (baris, kolom) untuk tampilan yang lebih rapi
            "bentuk_matrix": f"{feature_stats['matrix_tf_idf'][0]} dokumen x {feature_stats['matrix_tf_idf'][1]} fitur",
            # Mengubah array numpy ke list Python agar mudah di-JSON-kan
            "top_10_fitur_contoh": feature_stats["example_fitur"].tolist()
    },
        "data_preview": labeled_data_preview_list
    }
    
    print(json.dumps(final_output))

if __name__ == "__main__":
    main()