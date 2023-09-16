import { useState, useEffect, useRef } from "react";
import { Chart, ChartType, ChartData } from "chart.js";

type ChartConfig = {
  type: ChartType;
  data: ChartData;
};

export function useChart(chartConfig: ChartConfig) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, chartConfig);
        setChart(newChart);
      }
    }

    return () => {
      chart?.destroy();
    };
  }, [chartConfig]);

  return { chartRef, chart };
}
