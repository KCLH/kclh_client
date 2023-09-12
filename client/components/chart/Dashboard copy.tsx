"use client";

import { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export default function Dashboard() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    // 서버에서 데이터 가져오기 (여기서는 임의의 API 사용)
    axios
      .get("https://api.example.com/data")
      .then((response) => {
        // API 응답을 바탕으로 차트 데이터 설정
        const data = response.data;
        setChartData({
          labels: Object.keys(data),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(data),
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)",
                "rgba(75, 192,192)",
                "rgba(153 ,102 ,255)",
                "rgba(255 ,159 ,64)",
              ],
            },
          ],
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return <div>{chartData && <Bar data={chartData} />}</div>;
}
