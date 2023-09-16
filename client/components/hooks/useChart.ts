import { useState, useEffect, useRef } from "react";
import { Chart, ChartType, ChartData } from "chart.js";

type ChartConfig<T extends ChartType> = {
  type: T;
  data: ChartData<any>;
};

export function useChart<T extends ChartType>(
  chartConfig: ChartConfig<T> | null
) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && chartConfig) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (!chart) {
          // 차트가 초기화되지 않았다면 초기화
          const newChart = new Chart(ctx, chartConfig);
          setChart(newChart);
        } else {
          // 차트가 이미 초기화되었다면 데이터를 업데이트
          chart.data = chartConfig.data;
          chart.update();
        }
      }
    }

    return () => {
      chart?.destroy();
    };
  }, [chartConfig]);

  return { chartRef, chart };
}
