// components/SparklineChart.tsx

"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

interface SparklineChartProps {
  data: number[];
  title: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, title }) => {
  const options = {
    chart: {
      id: "sparkline",
      group: "sparklines",
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth", // 곡선 형태의 그래프로 설정
    },
    fill: {
      opacity: 0.5, // 그래프 영역의 투명도 설정
    },
    xaxis: {
      // x축 라벨 설정
      labels: {
        show: false, // x축 라벨 숨김
      },
    },
    yaxis: {
      // y축 라벨 설정
      labels: {
        show: false, // y축 라벨 숨김
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <ApexCharts
        options={options}
        series={[{ data }]}
        type="area"
        height={160}
      />
    </div>
  );
};

export default SparklineChart;
