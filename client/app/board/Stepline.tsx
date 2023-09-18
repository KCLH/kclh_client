"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Stepline = () => {
  const seriesData = [
    {
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "stepline",
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "주사위 값",
      align: "left",
    },
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Stepline;
