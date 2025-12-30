"use client";
import { PiX } from "react-icons/pi";
import Social_media from "@/components/ui/Social_media";

export default function Aside({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop (Overlay Gelap) */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 h-full w-70 bg-white z-70 shadow-2xl p-6 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header Aside */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-black tracking-tighter">THE OPINION</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <PiX className="text-2xl text-black" />
            </button>
          </div>

          {/* Di dalam Aside.js pada bagian Content */}
          <div className="flex-1">
            <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-6">
              Social Connection
            </p>

            {/* Mengirimkan prop isMobile agar ikon muncul di layar HP */}
            <div className="p-1">
              <Social_media isMobile={true} />
            </div>

            <div className="mt-10 space-y-4">
              <p className="text-sm text-slate-500 font-medium">
                Need help or customization of crawling data?
                <br />
                <span className="text-black font-bold">Call us.</span>
              </p>
            </div>
          </div>

          {/* Footer Aside */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">
              © 2024 Opinion Data Lab.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
