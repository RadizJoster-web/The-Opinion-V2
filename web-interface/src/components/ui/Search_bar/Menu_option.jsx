"use client";
import { PiGearSix, PiFileCsv } from "react-icons/pi";

const MenuOptions = ({ onSelect }) => (
  <div className="p-2 flex flex-col gap-1">
    <button
      onClick={() => onSelect("settings")}
      className="flex items-center gap-3 p-4 hover:bg-gray rounded-xl transition-colors text-left"
    >
      <PiGearSix className="text-2xl text-blue-500" />
      <div>
        <p className="font-semibold text-sm">Search Settings</p>
        <p className="text-xs text-gray-500">
          Filter by date, limit, and language
        </p>
      </div>
    </button>
    <button
      onClick={() => onSelect("upload")}
      className="flex items-center gap-3 p-4 hover:bg-gray rounded-xl transition-colors text-left"
    >
      <PiFileCsv className="text-2xl text-green-500" />
      <div>
        <p className="font-semibold text-sm">Upload CSV</p>
        <p className="text-xs text-gray-500">Import your own dataset</p>
      </div>
    </button>
  </div>
);

export default MenuOptions;
