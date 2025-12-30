"use client";
import { PiCalendar, PiHash, PiTranslate } from "react-icons/pi";

const crawlForm = ({ crawl, setCrawl, onSave }) => (
  <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
    <div className="col-span-1">
      <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
        <PiCalendar /> Date From
      </label>
      <input
        type="date"
        className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-blue-500"
        value={crawl.date_from}
        onChange={(e) => setCrawl({ ...crawl, date_from: e.target.value })}
      />
    </div>
    <div className="col-span-1">
      <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
        <PiCalendar /> Date Until
      </label>
      <input
        type="date"
        className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-blue-500"
        value={crawl.date_until}
        onChange={(e) => setCrawl({ ...crawl, date_until: e.target.value })}
      />
    </div>
    <div className="col-span-1">
      <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
        <PiHash /> Limit
      </label>
      <input
        type="number"
        className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-blue-500"
        value={crawl.limit}
        onChange={(e) => setCrawl({ ...crawl, limit: e.target.value })}
      />
    </div>
    <div className="col-span-1">
      <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
        <PiTranslate /> Language
      </label>
      <select
        className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-blue-500"
        value={crawl.lang}
        onChange={(e) => setCrawl({ ...crawl, lang: e.target.value })}
      >
        <option value="id">Indonesian</option>
        <option value="en">English</option>
      </select>
    </div>
    <button
      onClick={onSave}
      className="col-span-2 bg-dark text-white py-2 rounded-lg text-sm mt-2 transition-opacity hover:opacity-90"
    >
      Save crawl
    </button>
  </div>
);

export default crawlForm;
