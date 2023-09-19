import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart = () => {
  // MQTT 브로커 및 토픽 정보
  const brokerUrl = "mqtt://192.168.0.106:8884";
  const topic = "edukit1";

  // MQTT 클라이언트를 사용하여 데이터를 가져오는 커스텀 훅을 사용합니다.
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  const [chartData, setChartData] = useState({
    series: [], // 파이 차트 데이터
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [], // 파이 차트 레이블
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  // MQTT 데이터를 기반으로 차트 데이터 업데이트
  useEffect(() => {
    if (!isLoading && plcData.length > 0) {
      // 필요한 데이터 항목을 가져옵니다. 여기서는 "15", "16", "17"의 데이터를 합칩니다.
      const data15 = plcData.find((item) => item.tagId === "15");
      const data16 = plcData.find((item) => item.tagId === "16");
      const data17 = plcData.find((item) => item.tagId === "17");

      if (data15 && data16 && data17) {
        // 데이터를 합친 후 차트 데이터 업데이트
        const total =
          Number(data15.value) + Number(data16.value) + Number(data17.value);
        const series = [
          (data15.value / total) * 100,
          (data16.value / total) * 100,
          (data17.value / total) * 100,
        ];
        const newLabels = [
          `1호기 생산량 ${data15.value}`,
          `1호기 생산량 ${data16.value}`,
          `1호기 생산량 ${data17.value}`,
        ];

        setChartData({
          series,
          options: {
            ...chartData.options,
            labels: newLabels,
          },
        });
      }
    }
  }, [plcData, isLoading]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieChart;
