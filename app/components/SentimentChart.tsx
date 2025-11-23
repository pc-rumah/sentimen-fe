"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Sentimen</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
}
