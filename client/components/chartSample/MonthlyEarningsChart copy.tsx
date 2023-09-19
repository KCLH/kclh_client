// components/MonthlyEarningsChart.tsx
"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

interface MonthlyEarningsChartProps {
  data: number[];
}

const MonthlyEarningsChart: React.FC<MonthlyEarningsChartProps> = ({
  data,
}) => {
  const options = {
    chart: {
      type: "area",
      height: 260,
      background: "#eff4f7",
      sparkline: {
        enabled: true,
      },
      offsetY: 20,
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
        show: true, // x축 라벨 표시 여부
        style: {
          fontSize: "12px", // 라벨 폰트 크기
        },
      },
    },
    yaxis: {
      // y축 라벨 설정
      labels: {
        show: true, // y축 라벨 표시 여부
        style: {
          fontSize: "12px", // 라벨 폰트 크기
        },
      },
    },
    title: {
      text: "Monthly Earnings", // 그래프 제목
      align: "left", // 제목 위치 (왼쪽)
      style: {
        fontSize: "18px", // 제목 폰트 크기
      },
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={[{ data }]}
        type="area"
        height={260}
      />
    </div>
  );
};

export default MonthlyEarningsChart;
