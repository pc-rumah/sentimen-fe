"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Jumlah",
  },
  positif: {
    label: "Positif",
    color: "#4ade80",
  },
  netral: {
    label: "Netral",
    color: "#60a5fa",
  },
  negatif: {
    label: "Negatif",
    color: "#f87171",
  },
} satisfies ChartConfig;

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

  const chartData = [
    { sentiment: "positif", count: dist.positif, fill: "var(--color-positif)" },
    { sentiment: "netral", count: dist.netral, fill: "var(--color-netral)" },
    { sentiment: "negatif", count: dist.negatif, fill: "var(--color-negatif)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Sentimen</CardTitle>
        <CardDescription>Hasil analisis sentimen dari data yang diinput</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-[1000px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sentiment"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
