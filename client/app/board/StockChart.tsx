// components/StockChart.tsx
"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// 주식 데이터
const stockData = {
  prices: [
    7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95,
    7347.75, 7311.25,
    // 이하 생략
  ],
  dates: [
    "02 Jun 2017",
    "05 Jun 2017",
    "06 Jun 2017",
    "07 Jun 2017",
    "08 Jun 2017",
    "09 Jun 2017",
    "12 Jun 2017",
    "13 Jun 2017",
    "14 Jun 2017",
    "15 Jun 2017",
    // 이하 생략
  ],
};

const StockChart: React.FC = () => {
  // ApexCharts 상태 관리
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "area",
      height: 340,
    },
    xaxis: {
      type: "datetime",
    },
    // 그 외 옵션 설정
  });

  // 주식 데이터 업데이트
  useEffect(() => {
    // 주식 데이터 업데이트 로직 추가 가능
  }, []);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={stockData.prices}
        type="area"
        height={340}
      />
    </div>
  );
};

export default StockChart;
