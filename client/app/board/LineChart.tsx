import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// MQTT 브로커 및 토픽 정보
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

const LineChart = () => {
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);
  const [speed, setSpeed] = useState(1000); // 업데이트 속도를 관리할 상태 변수

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "축1 속도",
        data: [], // 축1 속도 데이터를 저장할 배열
      },
      {
        name: "축2 속도",
        data: [], // 축2 속도 데이터를 저장할 배열
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
            speed: speed,
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
        text: "3호기 축 속도",
        align: "left",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        categories: [], // 시간 데이터를 저장할 배열
      },
      yaxis: {
        max: 100, // 초기 최대값 설정
      },
      legend: {
        show: true,
      },
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const speed1 = plcData.find((item) => item.tagId === "43");
      const speed2 = plcData.find((item) => item.tagId === "44");

      if (newLabelItem && speed1 && speed2) {
        const newTime = new Date(newLabelItem.value).getTime(); // x축에 사용할 시간 데이터
        const newData1 = {
          x: newTime,
          y: parseFloat(speed1.value), // 첫 번째 데이터셋의 y값
        };
        const newData2 = {
          x: newTime,
          y: parseFloat(speed2.value), // 두 번째 데이터셋의 y값
        };

        // 레이블 및 데이터가 일정 개수를 초과하면 오래된 데이터를 삭제합니다.
        if (chartData.series[0].data.length > 20) {
          chartData.series[0].data.shift();
          chartData.series[1].data.shift();
        }

        // 차트 데이터를 업데이트합니다.
        setChartData((prevChartData) => ({
          series: [
            {
              name: "축1 속도",
              data: [...prevChartData.series[0].data, newData1],
            },
            {
              name: "축2 속도",
              data: [...prevChartData.series[1].data, newData2],
            },
          ],
          options: {
            ...prevChartData.options,
            yaxis: {
              max: Math.max(
                newData1.y,
                newData2.y,
                prevChartData.options.yaxis.max
              ), // 최대값 업데이트
            },
          },
        }));
      }
    }
  }, [plcData, isLoading]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
