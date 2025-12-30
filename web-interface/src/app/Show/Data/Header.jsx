"use client";
import Button from "@/components/ui/Button";

import { PiFileText } from "react-icons/pi";

export default function Header({ file_name, handleAnlize }) {
  const handle_export_csv = () => {
    window.location.href = `/api/download/${file_name}`;
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-slate-500 mb-4">
          <PiFileText className="text-lg" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            {file_name}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-[950] tracking-tighter leading-[0.85] mb-6 text-black">
          Result Crawling
        </h1>
      </div>

      <div className="flex flex-row items-end gap-2">
        <Button
          text="Classify"
          className="py-3 px-5 bg-transparent text-dark border border-dark hover:text-light"
          onClick={(e) => handleAnlize(e)}
        />
        <Button text="Export CSV" onClick={handle_export_csv} />
      </div>
    </header>
  );
}
