"use client";
import { PiUploadSimple } from "react-icons/pi";

const FileUploadArea = ({ onFileDrop, fileInputRef, onFileChange }) => (
  <div
    onClick={() => fileInputRef.current.click()}
    onDragOver={(e) => e.preventDefault()}
    onDrop={onFileDrop}
    className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all animate-in zoom-in-95"
  >
    <PiUploadSimple className="text-3xl text-blue-500" />
    <p className="text-xs text-gray-500 text-center">Click or Drag CSV</p>
    <input
      type="file"
      ref={fileInputRef}
      onChange={onFileChange}
      className="hidden"
      accept=".csv"
    />
  </div>
);

export default FileUploadArea;
