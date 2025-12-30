"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";

import Search_bar from "@/components/ui/Search_bar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

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

  return (
    <main className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-hidden">
      {/* Subtle Pattern Background - Memberikan kesan "kertas" atau "grid" data */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {isLoading && (
        <div className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl animate-in fade-in duration-300">
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
                Crawling in progress
              </p>
            </div>
          </span>
        </div>
      )}

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        {/* Label Kecil di Atas Judul */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-black/5 bg-white shadow-sm transition-all hover:border-black/20">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-black uppercase">
            The Opinion v2.0
          </span>
        </div>

        {/* Heading Section */}
        <header className="text-center mb-12">
          {/* Main Title dengan Semicolon sebagai Accent */}
          <h1 className="text-6xl md:text-[5.5rem] font-[950] text-black tracking-tighter leading-[0.9] mb-8">
            Crawl & Analyze
          </h1>

          <div className="max-w-2xl mx-auto space-y-3">
            {/* Sub-deskripsi yang menonjolkan fungsi */}
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Get data from tweeter, let our AI read the atmosphere,{" "}
              <br className="hidden md:block" />
              and get conclusion in second.{" "}
            </p>
          </div>
        </header>

        {/* Search Bar Container */}
        <div className="w-full mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <Search_bar isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        {/* Footer Info / Capabilities */}
        <div className="grid grid-cols-3 gap-0 md:gap-8 w-full max-w-3xl md:pt-12 border-t border-black/5">
          <div className=" md:border border-black/30 md:p-5 rounded-2xl text-center md:text-start">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
              Source
            </h3>
            <p className="text-sm text-slate-500">
              Twitter (X) Real-time Stream
            </p>
          </div>
          <div className=" md:border border-black/30 md:p-5 rounded-2xl text-center md:text-start">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
              Processing
            </h3>
            <p className="text-sm text-slate-500">Natural Language Toolkit</p>
          </div>
          <div className=" md:border border-black/30 md:p-5 rounded-2xl text-center md:text-start">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
              Output
            </h3>
            <p className="text-sm text-slate-500">
              Sentiment Score & Visualization
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Blur (Sangat halus, agar tetap terasa light) */}
      <div className="absolute top-[-10%] right-[-10%] w-100 h-100 bg-blue-50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-slate-100 rounded-full blur-[120px] -z-10" />
    </main>
  );
}
