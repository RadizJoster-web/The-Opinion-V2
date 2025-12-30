"use client";
import { PiMagnifyingGlass, PiPlusCircle } from "react-icons/pi";
import Button from "../Button";

const SearchInput = ({
  showMenu,
  setShowMenu,
  onSetActiveTab,
  crawl,
  setCrawl,
  handleCrawling,
}) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 flex items-center px-3 gap-2">
      <PiMagnifyingGlass className="text-xl text-gray-400" />
      <input
        type="text"
        placeholder="Search topic..."
        value={crawl.topic}
        onChange={(e) => setCrawl({ ...crawl, topic: e.target.value })}
        className="w-full py-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
      />
    </div>

    <button
      onClick={() => {
        setShowMenu(!showMenu);
        onSetActiveTab(null);
      }}
      className={`p-3 rounded-xl transition-all active:scale-95 ${
        showMenu
          ? "bg-danger text-light hover:bg-danger-darker"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <PiPlusCircle
        className={`text-2xl transition-transform duration-300 ${
          showMenu ? "rotate-45" : ""
        }`}
      />
    </button>

    <Button text="Crawl" onClick={() => handleCrawling()} />
  </div>
);

export default SearchInput;
