"use client";
import { useEffect, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    setStatus("Sedang mengupload...");
    const formData = new FormData();
    formData.append("dataset", file);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setStatus(`Berhasil! File: ${result.fileName}`);
      } else {
        setStatus("Gagal mengupload file.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Terjadi kesalahan sistem.");
    }
  };

  useEffect(() => {
    console.log({ file, status });
  }, [file, status]);

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">Upload Dataset</h2>

      <div className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          accept=".csv, .json, .xlsx"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Mulai Klasifikasi
        </button>
      </div>

      {status && <p className="text-sm text-gray-600 mt-2 italic">{status}</p>}
    </div>
  );
}
