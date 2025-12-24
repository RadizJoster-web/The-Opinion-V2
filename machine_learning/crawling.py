import os    
import pandas as pd
import re
import subprocess
import sys


def crawl_tweets(title_crawling, date_from, date_until, limit_tweet, lang, API_TWEET):
    
    # 2. Validasi limit_tweet
    if not isinstance(limit_tweet, int) or limit_tweet <= 0:
        raise ValueError("Parameter 'limit_tweet' harus berupa bilangan bulat positif.")

    # 3. Validasi lang
    # Asumsi: hanya menerima kode bahasa dua huruf dan tidak kosong
    if not isinstance(lang, str) or not re.match(r'^[a-z]{2}$', lang.lower()):
        raise ValueError("Parameter 'lang' harus berupa string kode bahasa dua huruf (e.g., 'id', 'en').")
    
    # The file name will save as title_crawling.csv, but if there's space in between 2 word then will replace with "-"
    file_name = f"{title_crawling}.csv"
    if " " in title_crawling:
         clean_title_crawling = title_crawling.replace(" ", "-")
         file_name = f"{clean_title_crawling}.csv"

    # Search Keyword for theme
    search_keyword = f"{title_crawling} since:{date_from} until:{date_until} lang:{lang}"

    try:
        # Crawling tweet
        command = [
            "npx", 
            "-y", 
            "tweet-harvest@2.6.1", 
            "-o", file_name, 
            "-s", search_keyword, 
            "--tab", "LATEST", 
            "-l", str(limit_tweet),
            "--token", API_TWEET
        ]

        # Menjalankan perintah
        # 1. stdout=subprocess.DEVNULL: MENGALIKAN stdout ke tempat sampah
        # 2. stderr=subprocess.DEVNULL: MENGALIKAN stderr ke tempat sampah
        # 3. check=True: Akan melempar CalledProcessError jika status code != 0
        result = subprocess.run(
            command,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

        # if success result.returncode will 0
        status_code_crawling = 0
    except subprocess.CalledProcessError as e:
        # failed when runing npx
        print(f"Crawling failled with code: {e.returncode}", file=sys.stderr)
        return None
    except FileExistsError:
        # This will happend when 'npx' and 'node' can't find on path
        print("Error: 'npx' not found. Is Node.js installed?", file=sys.stderr)
        return None

    try:

        # Specify the path to your CSV file
        file_path = f"./tweets-data/{file_name}"

        # Read the cvs file as pandas module
        df = pd.read_csv(file_path, delimiter=",")

        return df
    
    except FileNotFoundError:
        return None
    except pd.errors.EmptyDataError:
        return None
    except Exception as e:
        return None