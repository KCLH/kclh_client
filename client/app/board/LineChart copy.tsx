"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChart = () => {
  // 정적 데이터 생성
  const staticData = [
    { x: 1632657600000, y: 45 },
    { x: 1632657610000, y: 52 },
    { x: 1632657620000, y: 60 },
    // 추가 정적 데이터
  ];

  const [chartData, setChartData] = useState({
    series: [
      {
        data: staticData,
      },
    ],
    options: {
      chart: {
        id: "realtime",
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "3호기 축 속도",
        align: "left",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        max: 100,
      },
      legend: {
        show: false,
      },
    },
  });

  useEffect(() => {
    const updateChartData = () => {
      // 정적 데이터를 사용
      const newSeriesData = staticData;

      setChartData((prevChartData) => ({
        series: [
          {
            data: [...prevChartData.series[0].data, ...newSeriesData],
          },
        ],
        options: prevChartData.options,
      }));
    };

    const dataUpdateInterval = setInterval(updateChartData, 1000);

    return () => {
      clearInterval(dataUpdateInterval);
    };
  }, []);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
