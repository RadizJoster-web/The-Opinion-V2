import { FaExternalLinkAlt } from "react-icons/fa";

export default function Tweets_preview({ data_preview }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-[950] tracking-tighter uppercase italic text-black border-b-2 border-black">
          Data Preview
        </h2>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Random Sampling
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data_preview?.map((tweet, index) => (
          <div
            key={index}
            className="bg-white p-7 rounded-4xl border border-black/5 shadow-sm flex flex-col justify-between hover:border-black/20 hover:shadow-xl transition-all group relative overflow-hidden"
          >
            {/* Indicator Accent */}
            <div
              className={`absolute top-0 right-0 w-1.5 h-full ${
                tweet.sentiment === "Positif"
                  ? "bg-green-500"
                  : tweet.sentiment === "Negatif"
                  ? "bg-red-500"
                  : "bg-slate-300"
              }`}
            />

            <div>
              <div className="flex justify-between items-center mb-6">
                <span
                  className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter border ${
                    tweet.sentiment === "Positif"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : tweet.sentiment === "Negatif"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {tweet.sentiment}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {tweet.created_at}
                </span>
              </div>
              <p className="text-sm text-slate-800 font-semibold leading-relaxed mb-8 italic">
                "{tweet.clean_text}"
              </p>
            </div>

            <div className="pt-5 border-t border-slate-50 flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-slate-300 uppercase mb-1">
                  Polarity Score
                </p>
                <p
                  className={`text-xl font-black leading-none ${
                    tweet.polarity < 0
                      ? "text-red-500"
                      : tweet.polarity > 0
                      ? "text-green-600"
                      : "text-black"
                  }`}
                >
                  {tweet.polarity.toFixed(3)}
                </p>
              </div>
              <a
                href={tweet.tweet_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-dark hover:text-white transition-all transform hover:rotate-12"
              >
                <FaExternalLinkAlt className="text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
