import sys
import json
import pandas as pd
import os

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

    # Pre-Processing
    # Extraksi-Fitur [Hitung Matrix]
    # Klasifikasi sentimen


if __name__ == "__main__":
    classify()