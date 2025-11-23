"use client";

import { Bar } from "react-chartjs-2";

export default function SentimentChart({ results }: any) {
  const dist = results.reduce(
    (acc: any, row: any) => {
      const lbl = row.svc || row.bert || row.nb;
      if (lbl === "Positif") acc.positif++;
      else if (lbl === "Negatif") acc.negatif++;
      else acc.netral++;
      return acc;
    },
    { positif: 0, netral: 0, negatif: 0 }
  );

  const chartData = {
    labels: ["Positif", "Netral", "Negatif"],
    datasets: [
      {
        label: "Jumlah Sentimen",
        data: [dist.positif, dist.netral, dist.negatif],
        backgroundColor: ["#4ade80", "#60a5fa", "#f87171"],
      },
    ],
  };

  return (
    <div className="bg-slate-50 p-4 rounded border">
      <Bar data={chartData} />
    </div>
  );
}
