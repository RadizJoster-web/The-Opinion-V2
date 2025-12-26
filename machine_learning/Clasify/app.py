import pandas as pd
import sys
import json

import crawling
import pre_processing
import extraksi_fitur
import analisis_sentiment_en

# Take data from node
data_from_node = sys.stdin.read()

def main():
    try:
        input_obj = json.loads(data_from_node)

        # CORRECTED: Access the parameters directly from the loaded object
        search_keyword = input_obj.get("search_keyword")
        date_from = input_obj.get("date_from")
        date_until = input_obj.get("date_until")
        limit_tweet = input_obj.get("limit_tweet")
        lang = input_obj.get("lang")
        TWEET_TOKEN = input_obj.get("TWEET_TOKEN")

    except Exception as e:
        error_result = {
        "status": "error",
        "message": f"Python script failed: {e}"
        }
        
        print(json.dumps(error_result)) 
        sys.exit(1)

    # --- Start of Pipeline ---
    
    # 1. DATA CRAWLING
    # Assume crawl_tweets returns a DataFrame or None
    data_tweets = crawling.crawl_tweets(search_keyword, date_from, date_until, limit_tweet, lang, TWEET_TOKEN)

    
    if data_tweets is None or data_tweets.empty:
        return
    

    # 2. PRE-PROCESSING
    # Assume pre_processing returns the DataFrame with 'clean_text'
    clean_data = pre_processing.pre_processing(data_tweets) 

    # 3. SENTIMENT ANALYSIS
    # ----------------------------------------------------------------------
    # if lang.lower() == 'id':
    #     # Panggil fungsi yang memproses DataFrame di analisis_sentiment_id
    #     # Nama fungsi yang benar adalah analisis_sentiment_indobert
    #     labeled_data = analisis_sentiment_id.analisis_sentiment_indobert(clean_data) 
    # elif lang.lower() == 'en':
    #     # Panggil fungsi yang memproses DataFrame di analisis_sentiment_en
    #     # Nama fungsi yang benar adalah analisis_sentiment
    labeled_data = analisis_sentiment_en.analisis_sentiment(clean_data)
    # else:
    #     # Default ke Bahasa Inggris
    #     labeled_data = analisis_sentiment_en.analisis_sentiment(clean_data)
    # ----------------------------------------------------------------------
    
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
        "language_used": lang.upper() if lang else "EN (Default)",
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