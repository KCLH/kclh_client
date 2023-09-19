import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RadialBarChart = ({ brokerUrl, eduKitTopic }) => {
  const [seriesData, setSeriesData] = useState([0, 0, 0]);
  const { plcData, isLoading } = useMqttClient(
    // "mqtt://192.168.0.106:8884",
    brokerUrl,
    // "edukit1"
    eduKitTopic
  );

  useEffect(() => {
    if (!isLoading) {
      // 필요한 데이터 항목을 가져와서 seriesData를 업데이트합니다.
      const newData = plcData
        .filter((item) => ["15", "16", "17"].includes(item.tagId))
        .map((item) => item.value * 12.5);

      setSeriesData(newData);
    }
  }, [plcData, isLoading]);

  const colors = ["#FD6A6A", "#4CAF50", "#449DD1", "#F9C80E"];

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
            color: "#FEB019",
            formatter: function (w) {
              // totalValue는 각 값의 합입니다.
              const totalValue = seriesData.reduce((a, b) => a + b, 0);
              // const totalValue = seriesData;
              return plcData.find((item) => item.tagId === "17")?.value;
            },
          },
        },
      },
    },
    labels: ["1호기 생산량", "2호기 생산량", "3호기 생산량"],
    colors: colors,
    fill: {
      colors: colors,
    },
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

export default RadialBarChart;
