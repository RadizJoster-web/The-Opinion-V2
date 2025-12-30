"use cilent";
import Button from "@/components/ui/Button";

import {
  PiFileText,
  PiDownloadSimple,
  PiPrinter,
  PiShareNetwork,
  PiMicrosoftExcelLogoDuotone,
} from "react-icons/pi";

export default function Header({ file_name }) {
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
          Analytics Overview
        </h1>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button
          text="Export CSV"
          icon={PiDownloadSimple}
          onClick={handle_export_csv}
          className="px-6 py-3 bg-dark text-white cursor-pointer"
        />

        <div className="flex gap-1">
          <button className="p-3 bg-white border border-black/10 rounded-xl hover:bg-gray shadow-sm transition-colors">
            <PiPrinter className="text-xl text-slate-600" />
          </button>
          <button className="p-3 bg-white border border-black/10 rounded-xl hover:bg-gray shadow-sm transition-colors">
            <PiMicrosoftExcelLogoDuotone className="text-xl text-slate-600" />
          </button>
          <button className="p-3 bg-white border border-black/10 rounded-xl hover:bg-gray shadow-sm transition-colors">
            <PiShareNetwork className="text-xl text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
