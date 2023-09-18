import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useMqttClient } from "@/components/hooks/useMqttClient";

// MQTT 브로커 및 토픽 정보
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

function LineChart() {
  const chartRef = useRef(null);

  // MQTT 클라이언트를 사용하여 데이터를 가져오는 커스텀 훅을 사용합니다.
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  // 초기 차트 데이터 설정
  const initialData = {
    series: [
      {
        data: [],
      },
      {
        data: [],
      },
    ],
    options: {
      chart: {
        id: "realtime",
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Dynamic Updating Chart",
        align: "left",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        range: 60 * 1000, // X 축 범위를 조정하세요 (60초)
      },
      yaxis: {
        max: 100,
      },
      legend: {
        show: true,
      },
    },
  };

  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    if (!isLoading) {
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const speed1 = plcData.find((item) => item.tagId === "43");
      const speed2 = plcData.find((item) => item.tagId === "44");

      // 새로운 데이터를 생성합니다.
      const newSeries1 = {
        x: new Date().getTime(),
        y: parseFloat(speed1.value),
      };

      const newSeries2 = {
        x: new Date().getTime(),
        y: parseFloat(speed2.value),
      };

      // 차트 데이터를 업데이트합니다.
      setChartData((prevData) => ({
        series: [
          {
            data: [...prevData.series[0].data, newSeries1],
          },
          {
            data: [...prevData.series[1].data, newSeries2],
          },
        ],
        options: prevData.options, // 옵션은 그대로 유지합니다.
      }));
    }
  }, [plcData, isLoading]);

  return (
    <div id="chart">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default LineChart;
