"use client";

import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgb (255 ,99 ,132)",
        "rgb (54 .162 .235)",
        "rgb (255 .205 .86)",
      ],
      hoverOffset: 4,
    },
  ],
};

function DoughnutChart() {
  return <Doughnut data={data} />;
}

export default DoughnutChart;
