"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MultipleRadialbars = () => {
  const seriesData = [44, 55, 67];

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "총 생산량",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 166;
            },
          },
        },
      },
    },
    labels: ["1호기 생산량", "2호기 생산량", "3호기 생산량"],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default MultipleRadialbars;
