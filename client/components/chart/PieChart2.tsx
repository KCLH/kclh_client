import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import Moment from "moment";
import "moment/locale/ko";

// 한국어로 날짜 및 시간 형식을 설정합니다.
Moment.locale("ko");

// 날짜 형식을 정의합니다. 예: "9월 15일"
const DATE_FORMAT = "MMM DD";

// MQTT 브로커 및 토픽 정보
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

// ApexCharts 라이브러리 동적 로드
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function PieChart() {
  const chartRef = useRef(null);

  // MQTT 클라이언트를 사용하여 데이터를 가져오는 커스텀 훅을 사용합니다.
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  // 차트 데이터의 템플릿 및 초기 데이터 설정
  const initialData = {
    labels: [], // 파이 차트의 레이블
    series: [1, 1, 1], // 시리즈 데이터 배열
  };

  const [chartData, setChartData] = useState(initialData);

  // 데이터를 업데이트하는 함수
  const updateChartData = (newLabels, newSeries) => {
    if (newLabels && newSeries) {
      // 파이 차트 데이터를 업데이트합니다.
      setChartData({
        labels: newLabels, // 파이 차트 레이블
        series: newSeries, // 파이 차트 시리즈 데이터 업데이트
      });
    }
  };

  useEffect(() => {
    // 데이터가 로드되면 실행되는 효과를 정의합니다.
    if (!isLoading) {
      // 필요한 데이터 항목을 가져옵니다. 여기서는 "15", "16", "17"의 데이터를 합칩니다.
      const data15 = plcData.find((item) => item.tagId === "15");
      const data16 = plcData.find((item) => item.tagId === "16");
      const data17 = plcData.find((item) => item.tagId === "17");

      if (data15 && data16 && data17) {
        // 데이터를 합친 후 파이 차트 업데이트
        const newLabels = [data15.name, data16.name, data17.name];
        const newSeries = [data15.value, data16.value, data17.value];
        updateChartData(newLabels, newSeries);
      }
    }
  }, [plcData, isLoading]);

  // ApexCharts를 사용하여 파이 차트를 렌더링합니다.
  const options = {
    labels: chartData.labels,
    chart: {
      type: "pie",
    },
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
  };

  return (
    <ReactApexChart options={options} series={chartData.series} type="pie" />
  );
}

export default PieChart;
