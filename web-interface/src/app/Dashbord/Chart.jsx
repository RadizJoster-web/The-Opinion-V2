"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ stats_sentiment, COLORS }) {
// Tambahkan pengecekan aman (safety check)
  const chartData = stats_sentiment 
    ? Object.keys(stats_sentiment).map((key) => ({
        name: key,
        value: stats_sentiment[key],
      }))
    : [];

  if (!stats_sentiment) return null; // Jangan render jika data kosong
  
  return (
    <div className="bg-white p-8 rounded-4xl border border-black/5 shadow-sm">
      <h3 className="text-xs font-black uppercase tracking-widest mb-8 text-slate-400">
        Sentiment Distribution
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{
                fontSize: "12px",
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
