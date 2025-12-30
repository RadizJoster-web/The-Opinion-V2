"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCrawlStore } from "@/store/useCrawlStore";

import SearchInput from "./Search_Input";
import MenuOptions from "./Menu_option";
import SettingsForm from "./Settings_form";
import FileUploadArea from "./File_upload_area";
import FileSelected from "./File_selected";

import { IoArrowBackOutline } from "react-icons/io5";

export default function Search_bar({ setIsLoading }) {
  // UI
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  // Crawl
  // Default Settings
  const [crawl, setCrawl] = useState({
    topic: "",
    date_from: "",
    date_until: "",
    limit: 100,
    lang: "en",
  });
  const setCrawlResult = useCrawlStore((state) => state.setCrawlResult);
  const handleCrawling = async (e) => {
    if (e) e.preventDefault();

    if (!crawl.topic.trim()) {
      return alert("Please enter topic or file");
    }

    try {
      setIsLoading(true);
      console.log("Memulai proses crawling...");

      const res = await fetch("/api/crawling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crawl),
      });

      if (!res.ok) {
        const error_data = await res.json();
        throw new Error(error_data.message || "Server error");
      }

      const data = await res.json();
      setCrawlResult(data);

      // 2. Beri jeda sangat singkat agar transisi tidak terlalu kasar
      setTimeout(() => {
        router.push("/Show/Data");
      }, 500);
    } catch (err) {
      console.log("Crawling Error", err);
      alert(`Crawling failed: ${err.message}`);
      setIsLoading(false); // 3. Matikan loading jika error
    }
  };

  // Uploaded File
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  // Memastikan hanya file csv
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer?.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      setSelectedFile(file);
      setShowMenu(false);
      setActiveTab(null);
    } else {
      alert("Please upload CSV format file");
    }
  };

  // Fatching api untuk menganalisis sentimen
  const handleAnlize = async (e) => {
    if (e) e.preventDefault();

    try {
      setIsLoading(true);
      console.log("Start to analyze:", selectedFile.name);

      const formData = new FormData();
      formData.append("dataset", selectedFile);

      const res = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const analyze_err = await res.json();
        throw new Error(analyze_err.message || "Server Error");
      }

      const data = await res.json();
      setCrawlResult(data);
      setTimeout(() => {
        router.push("/Dashbord");
      }, 500);
    } catch (err) {
      console.log("Crawling Error", err);
      alert(`Crawling failed: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[95%] xl:w-7/10 z-50">
      <div className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-2 transition-all">
        {selectedFile ? (
          <FileSelected
            fileName={selectedFile.name}
            onRemove={() => setSelectedFile(null)}
            handleAnlize={handleAnlize}
          />
        ) : (
          <SearchInput
            handleCrawling={handleCrawling}
            crawl={crawl}
            setCrawl={setCrawl}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            onSetActiveTab={setActiveTab}
          />
        )}

        {showMenu && !selectedFile && (
          <div className="absolute bottom-full mb-4 left-0 w-full md:w-96 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {!activeTab ? (
              <MenuOptions onSelect={setActiveTab} />
            ) : (
              <div className="p-5">
                <button
                  onClick={() => setActiveTab(null)}
                  className="text-xs font-bold bg-danger text-light py-1 px-5 mb-4 rounded-md hover:bg-danger-darker flex items-center gap-1"
                >
                  <IoArrowBackOutline className="text-light" />
                  Back
                </button>
                {activeTab === "settings" && (
                  <SettingsForm
                    crawl={crawl}
                    setCrawl={setCrawl}
                    onSave={() => setShowMenu(false)}
                  />
                )}
                {activeTab === "upload" && (
                  <FileUploadArea
                    fileInputRef={fileInputRef}
                    onFileChange={handleFileChange}
                    onFileDrop={(e) => {
                      e.preventDefault();
                      handleFileChange(e);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
