"use client";

import { Line } from "react-chartjs-2";

function LineChart({ inputData }: any) {
  const data = {
    labels: inputData.map((item: any) => item.name),
    datasets: [
      {
        label: "inputData",
        data: inputData.map((item: any) => item.value),
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
