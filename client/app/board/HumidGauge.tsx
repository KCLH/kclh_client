import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// MQTT 브로커 및 토픽 정보
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "iot1/info";

const TempGauge = () => {
  const [mqttData, setMqttData] = useState([]); // MQTT 데이터 저장
  const { iotData, isLoading } = useMqttClient(brokerUrl, topic); // MQTT 데이터 가져오기

  useEffect(() => {
    // 데이터가 로드되면 실행되는 효과를 정의합니다.
    if (!isLoading) {
      // 필요한 데이터 항목을 가져옵니다.
      const humid = iotData.find((item) => item.type === "humid");

      // MQTT 데이터를 업데이트합니다.
      setMqttData([parseFloat(humid?.value)]);
    }
  }, [iotData, isLoading]);

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["습도"],
  };

  return (
    <div id="chart">
      <h3 style={{ marginLeft: "20px" }}>습도</h3>
      <ReactApexChart options={options} series={mqttData} type="radialBar" />
    </div>
  );
};

export default TempGauge;
