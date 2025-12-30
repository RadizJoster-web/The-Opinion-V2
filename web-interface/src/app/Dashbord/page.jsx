"use client";
import Link from "next/link";
import { useCrawlStore } from "@/store/useCrawlStore";

import Header from "./Header";
import Chart from "./Chart";
import Fitur_ekstraksi from "./Fitur_extraction";
import Tweets_preview from "./Tweets_preview";

import { IoArrowBackOutline } from "react-icons/io5";

const COLORS = { Positif: "#10b981", Negatif: "#ef4444", Netral: "#64748b" };
export default function Dashboard() {
  const classifyResult = useCrawlStore((state) => state.crawlResult);
  
  // LOGIKA GUARD: Jika data belum ada, jangan panggil komponen anak dulu
  if (!classifyResult?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse font-bold">Memuat data analisis...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen font-sans max-w-7xl mx-auto pt-32 pb-20 px-6">
      <button className="mb-10">
        <Link href="/" className="flex items-center gap-3 text-xl">
          <IoArrowBackOutline />
          Back
        </Link>
      </button>

      {/* Header */}
      <Header file_name={classifyResult?.data?.file_name} />
      {/* TOP ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Sentiment Chart */}
        <Chart
          stats_sentiment={classifyResult?.data?.stats_sentiment}
          COLORS={COLORS}
        />
        {/* Extraction Features */}
        <Fitur_ekstraksi
          total_tweets={classifyResult?.data?.total_tweets}
          jumlah_fitur_tfidf={
            classifyResult?.data?.fitur_ekstraksi?.jumlah_fitur_tfidf
          }
          top_10_fitur={classifyResult?.data?.fitur_ekstraksi?.top_10_fitur}
        />
      </div>
      {/* DATA PREVIEW SECTION */}
      <Tweets_preview data_preview={classifyResult?.data?.data_preview} />
    </section>
  );
}
