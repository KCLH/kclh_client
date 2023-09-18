import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useMqttClient } from "@/components/hooks/useMqttClient";

// MQTT 브로커 및 토픽 정보
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

function RadialBarChart() {
  const chartRef = useRef(null);

  // MQTT 클라이언트를 사용하여 데이터를 가져오는 커스텀 훅을 사용합니다.
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  // 초기 차트 데이터 설정
  const initialData = {
    series: [76], // 초기 데이터
    options: {
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
          hollow: {
            margin: 5,
            size: "97%",
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
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    },
  };

  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    if (!isLoading) {
      // 필요한 데이터 항목을 가져옵니다.
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const speed1 = plcData.find((item) => item.tagId === "43");
      const speed2 = plcData.find((item) => item.tagId === "44");

      // 새로운 값을 계산합니다.
      const newValue =
        (parseFloat(speed1.value) + parseFloat(speed2.value)) / 2;

      // 차트 데이터를 업데이트합니다.
      setChartData({
        series: [newValue],
        options: chartData.options, // 옵션은 그대로 유지합니다.
      });
    }
  }, [plcData, isLoading]);

  return (
    <div id="chart">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
}

export default RadialBarChart;
