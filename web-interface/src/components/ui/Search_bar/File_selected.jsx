"use client";
import Button from "../Button";

import { PiFile, PiXCircle } from "react-icons/pi";

export default function FileSelected({ fileName, onRemove, handleAnlize }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in zoom-in duration-300 w-full">
      <div className="flex items-center gap-3">
        <PiFile className="text-2xl text-blue-600" />
        <span className="text-sm font-medium text-blue-800 truncate max-w-xs">
          {fileName}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onRemove}
          className="p-3 rounded-xl transition-all active:scale-95 bg-danger text-light hover:bg-danger-darker"
        >
          <PiXCircle className="text-2xl" />
        </button>

        <Button text="Analyze" onClick={handleAnlize} />
      </div>
    </div>
  );
}
