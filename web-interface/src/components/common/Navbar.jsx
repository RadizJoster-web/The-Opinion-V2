"use client"; // Pastikan ada directive ini karena kita menggunakan state
import { useState } from "react";
import Link from "next/link";
import { PiList } from "react-icons/pi"; // Tambah ikon X untuk tutup
import Social_media from "@/components/ui/Social_media";
import Aside from "./Aside"; // Import component Aside

export default function Navbar() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 z-50 w-full px-5 flex justify-between items-center h-25 xl:px-15">
        <div className="flex items-center">
          <button
            onClick={() => setIsAsideOpen(true)} // Buka Aside
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 duration-150 transition-colors"
          >
            <PiList className="text-2xl" />
          </button>

          <Link
            href="/"
            className="text-2xl font-[950] text-black ml-3 xl:ml-0 tracking-tighter uppercase"
          >
            The Opinion
          </Link>
        </div>

        {/* Social Media di Navbar (Desktop) */}
        <div className="hidden lg:block">
          <Social_media />
        </div>
      </nav>

      {/* Tampilkan Aside */}
      <Aside isOpen={isAsideOpen} onClose={() => setIsAsideOpen(false)} />
    </>
  );
}
