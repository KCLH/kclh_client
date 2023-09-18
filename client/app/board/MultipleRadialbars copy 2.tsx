import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RadialBarChart = () => {
  const [seriesData, setSeriesData] = useState([0, 0, 0]);
  const { plcData, isLoading } = useMqttClient(
    "mqtt://192.168.0.106:8884",
    "edukit1"
  );

  useEffect(() => {
    if (!isLoading && plcData.length > 0) {
      // 필요한 데이터 항목을 가져와서 seriesData를 업데이트합니다.
      const newData = plcData
        .filter((item) => ["15", "16", "17"].includes(item.tagId))
        .map((item) => item.value);

      setSeriesData(newData);
    }
  }, [plcData, isLoading]);

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
              const totalValue = seriesData.reduce((a, b) => a + b, 0);
              return totalValue + " 개";
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

export default RadialBarChart;
