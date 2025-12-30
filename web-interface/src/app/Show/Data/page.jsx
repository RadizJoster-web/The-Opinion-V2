"use client";
import { useState, useEffect } from "react";
import { useCrawlStore } from "@/store/useCrawlStore";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Tweets_preview from "./Tweets_preview";

import Loader from "@/components/ui/Loader";

export default function Show_data() {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const router = useRouter()

  useEffect(() => {
    let interval = null;

    if (isLoading) {
      // Pastikan angka mulai dari 0 setiap kali loading muncul
      setSeconds(0);

      // Set interval untuk menambah detik setiap 1000ms (1 detik)
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      // Jika loading berhenti, hapus interval
      clearInterval(interval);
    }

    // Cleanup function: Menghapus interval saat komponen di-unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const crawlResult = useCrawlStore((state) => state.crawlResult);
  const setCrawlResult = useCrawlStore((state) => state.setCrawlResult);

  const file_name = crawlResult?.data?.result_crawling?.file_name;

  // Fatching api untuk menganalisis sentimen
  const handleAnlize = async (e) => {
    if (e) e.preventDefault();

    try {
      setIsLoading(true);
      console.log("Start to analyze:", file_name);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file_name),
      });

      if (!res.ok) {
        const analyze_err = await res.json();
        throw new Error(analyze_err.message || "Server Error");
      }

      const data = await res.json();
      setCrawlResult(data);
      setTimeout(() => {
        router.push("/Dashbord");
      }, 500);
    } catch (err) {
      console.log("Classify Error", err);
      alert(`Classify failed: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen font-sans max-w-7xl mx-auto pt-32 pb-20 px-6">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {isLoading && (
        <div className="fixed top-0 left-0 inset-0 z-60 max-h-screen flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl animate-in fade-in duration-300">
          {/* Kontainer khusus untuk memberi ruang bagi Loader yang posisinya absolut */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <Loader />
          </div>

          {/* Counter Container */}
          <span className="flex flex-col mt-20 justify-center items-center text-center">
            <p className="text-7xl font-[950] text-black tracking-tighter italic leading-none">
              {seconds}
              <span className="text-blue-600 font-sans text-4xl">s</span>
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Analyzing in progress
              </p>
            </div>
          </span>
        </div>
      )}

      {/* Pastikan header mengambil file_name asli dari data */}
      <Header
        file_name={
          crawlResult?.data?.result_crawling?.file_name || "Result.csv"
        }
        handleAnlize={handleAnlize}
      />

      {crawlResult ? (
        <Tweets_preview
          tweets={crawlResult.data?.result_crawling?.tweets_preview || []}
          total_crawling={crawlResult.data.total_crawling}
        />
      ) : (
        <div className="text-center p-20">
          <p className="text-slate-400 font-bold uppercase tracking-widest">
            No Data Found. Please crawl again.
          </p>
        </div>
      )}
    </section>
  );
}
