"use client";
import React from "react";
import { PiTwitterLogo, PiArrowSquareOut } from "react-icons/pi";
import { VscQuote } from "react-icons/vsc";

export default function TweetPreviewList({ tweets = [] }) {
  // Jika data kosong
  if (!tweets || tweets.length === 0) {
    return (
      <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-400 text-sm font-medium">
          Belum ada data untuk ditampilkan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header Kecil */}
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">
          Tweet Preview
        </h3>
        <span className="text-[12px] font-bold text-black tracking-[0.2em]">
          10 Top Tweets
        </span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-4">
        {tweets.map((tweet, index) => (
          <div
            key={index}
            className="group bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all duration-300"
          >
            <div className="flex gap-4 items-start">
              {/* Icon Quote sebagai dekorasi */}
              <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:text-dark transition-colors">
                <VscQuote className="text-xl" />
              </div>

              <div className="flex-1">
                {/* Full Text */}
                <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed mb-4">
                  {tweet.full_text}
                </p>

                {/* Footer Card */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {tweet.created_at.split(" ").slice(0, 3).join(" ")}
                  </p>

                  {/* Tombol ke URL Asli */}
                  <a
                    href={tweet.tweet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Buka Tweet <PiArrowSquareOut className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
