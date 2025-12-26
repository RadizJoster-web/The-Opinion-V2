from sklearn.feature_extraction.text import TfidfVectorizer

def extraksi_fitur(clean_data):
    print(" ")

    vectorizer = TfidfVectorizer(max_features=500)
    free_matrix = vectorizer.fit_transform(clean_data['clean_text'])
    
    extraksi_fitur_output = {
            "total_tf_idf": len(vectorizer.get_feature_names_out()),
            "example_fitur": vectorizer.get_feature_names_out()[:10],
            "matrix_tf_idf": free_matrix.shape
        }

    return extraksi_fitur_output
    