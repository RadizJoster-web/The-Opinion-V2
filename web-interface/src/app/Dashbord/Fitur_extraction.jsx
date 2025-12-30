import { PiTrendUp } from "react-icons/pi";

export default function Fitur_ekstraksi({
  total_tweets,
  jumlah_fitur_tfidf,
  top_10_fitur,
}) {
  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-black/5 shadow-sm">
      <h3 className="text-xs font-black uppercase tracking-widest mb-8 text-slate-400">
        Extraction Details (TF-IDF)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="p-5 bg-slate-50 rounded-2xl border border-black/3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
            Total Tweets
          </p>
          <p className="text-3xl font-[950] text-black">{total_tweets}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-black/3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
            Unique Features
          </p>
          <p className="text-3xl font-[950] text-black">{jumlah_fitur_tfidf}</p>
        </div>
        <div className="col-span-2 p-5 bg-slate-50 rounded-2xl border border-black/3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
              Status Pipeline
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-black uppercase text-black italic">
                Ready for Analysis
              </p>
            </div>
          </div>
          <PiTrendUp className="text-4xl text-black/60" />
        </div>
      </div>
      <p className="text-[10px] font-black text-black uppercase mb-4 tracking-[0.2em]">
        Top Keywords Found
      </p>
      <div className="flex flex-wrap gap-2">
        {top_10_fitur?.map((fitur, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-slate-100 text-black text-[10px] font-black rounded-lg uppercase border border-black/5 hover:bg-black hover:text-white transition-all cursor-default"
          >
            {fitur}
          </span>
        ))}
      </div>
    </div>
  );
}
