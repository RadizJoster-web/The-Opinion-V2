import pandas as pd
import json
import re
import subprocess
import sys
import os

# Ambil data dari stdin (Node.js)
data_from_server = sys.stdin.read()

def crawl_tweets():
    try:
        input_obj = json.loads(data_from_server)

        topic = input_obj.get("topic")
        date_from = input_obj.get("date_from")
        date_until = input_obj.get("date_until")
        limit_tweet = input_obj.get("limit_tweet")
        lang = input_obj.get("lang")
        TWEET_TOKEN = input_obj.get("TWEET_TOKEN")

        # Validasi sederhana
        if not all([topic, TWEET_TOKEN]):
            raise ValueError("Topic atau Token tidak boleh kosong.")

    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Input error: {str(e)}"}))
        sys.exit(1)

    # 1. Tentukan BASE DIRECTORY untuk data crawling
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 2. Nama file (mengganti spasi dengan dash)
    clean_topic = topic.replace(" ", "-")
    file_name = f"{clean_topic}.csv"
    
    # 3. Path lengkap untuk dibaca Pandas nanti
    # tweet-harvest akan otomatis membuat folder 'tweets-data' di tempat command dijalankan
    file_path = os.path.join(base_dir, "tweets-data", file_name)

    # Search Keyword
    search_keyword = f"{topic} since:{date_from} until:{date_until} lang:{lang}"

    try:
        # Jalankan crawling
        command = [
            "npx", "-y", "tweet-harvest@2.6.1", 
            "-o", file_name, # Hanya nama file, tweet-harvest akan buat folder tweets-data otomatis
            "-s", search_keyword, 
            "--tab", "LATEST", 
            "-l", str(limit_tweet),
            "--token", TWEET_TOKEN
        ]

        # JALANKAN DI BASE_DIR (machine_learning)
        # Jangan jalankan di dalam tweets-data agar tidak double folder
        subprocess.run(
            command,
            check=True,
            cwd=base_dir, 
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

    except subprocess.CalledProcessError as e:
        print(json.dumps({"status": "error", "message": f"Crawling failed"}))
        return
    
    # 4. Membaca hasil
    try:
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
        else:
            # Cek fallback path jika file_path utama tidak ada
            fallback_path = os.path.join(base_dir, file_name)
            if os.path.exists(fallback_path):
                df = pd.read_csv(fallback_path)
            else:
                df = None

        if df is not None:
            # 1. Filter kolom dan ambil 10 data pertama
            # 2. Ubah ke dictionary agar bisa dimasukkan ke JSON utama
            preview_list = df[['full_text', 'tweet_url', "created_at"]].head(10).to_dict(orient='records')

            # 3. Buat struktur output gabungan
            python_output = {
                "status": "success",
                "file_name": file_name,
                "tweets_preview": preview_list
            }

            # 4. Kirim sebagai string JSON (Gunakan json.dumps, bukan .to_json())
            print(json.dumps(python_output))
        else:
            print(json.dumps({"status": "failed", "message": "File CSV tidak ditemukan."}))
    
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Read error: {str(e)}"}))
    
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Read error: {str(e)}"}))

if __name__ == "__main__":
    crawl_tweets()