from textblob import TextBlob # pyright: ignore[reportMissingImports]
import pandas as pd


def get_sentiment(text):
    # TextBlob(text) menerima SATU string teks, BUKAN DataFrame.
    polarity = TextBlob(text).sentiment.polarity

    if polarity > 0:
        return "Positif"
    elif polarity < 0:
        return "Negatif"
    else:
        return "Netral"


def analisis_sentiment(df):
    print(" ")
    df["sentiment"] = df["clean_text"].apply(get_sentiment)
    df["polarity"] = df["clean_text"].apply(lambda x: TextBlob(x).sentiment.polarity)
    return df



