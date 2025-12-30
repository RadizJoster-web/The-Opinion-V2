import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCrawlStore = create(
  persist(
    (set) => ({
      crawlResult: null,
      setCrawlResult: (data) => set({ crawlResult: data }),
      resetCrawl: () => set({ crawlResult: null }),
    }),
    {
      name: "crawl-storage", // Nama key di localStorage
    }
  )
);
