import re    

def pre_processing(df):
    # Pre-Processing

    # Make sure 'cleaning_text' not created yet
    if "clean_text" not in df.columns:
        possible_cols = ['text', 'full_text', 'content', 'tweet']
        text_col = None

        for col in possible_cols:
            if col in df.columns:
                text_col = col
                break
        
        if text_col is None:
            # Tetap gunakan raise ValueError agar proses utama tahu kolom tidak ditemukan
            raise ValueError("Can't find column named text in DataFrame, Make sure there's at least 'text' or 'full_text' ")
        
        def cleaning_text(text):
            text = str(text).lower()
            text = re.sub(r"http\S+|www\S+", "", text)
            text = re.sub(r"@\w+|#\w+", "", text)
            text = re.sub(r"[^a-zA-Z\s]", " ", text)
            text = re.sub(r"\s+", " ", text).strip()
            return text
        
        df['clean_text'] = df[text_col].apply(cleaning_text)
        
    return df