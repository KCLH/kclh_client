import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import "chartjs-adapter-moment";
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

function SteppedLineChart() {
  const chartRef = useRef(null);

  // MQTT 클라이언트를 사용하여 데이터를 가져오는 커스텀 훅을 사용합니다.
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  // 차트 데이터의 템플릿 및 초기 데이터 설정
  const chartDataTemplate = {
    name: "", // 데이터셋의 이름
    data: [], // 데이터 포인트 배열
  };

  const initialData = {
    labels: [], // x 축 레이블
    series: [chartDataTemplate],
  };

  const [chartData, setChartData] = useState(initialData);

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      type: "datetime", // x 축은 날짜/시간 형식
      labels: {
        formatter: function (value) {
          return Moment(value).format(DATE_FORMAT);
        },
      },
    },
    yaxis: {
      min: 0, // y 축은 0부터 시작
    },
  };

  // 데이터를 업데이트하는 함수
  const updateChartData = (newLabelItem, dice) => {
    if (newLabelItem && dice) {
      const newLabels = [...chartData.labels, newLabelItem.value];
      const diceData = [...chartData.series[0].data, parseFloat(dice.value)];

      // 레이블 및 데이터가 일정 개수를 초과하면 오래된 데이터를 삭제합니다.
      if (newLabels.length > 20) {
        newLabels.shift();
        diceData.shift();
      }

      // 차트 데이터를 업데이트합니다.
      setChartData({
        labels: newLabels,
        series: [
          {
            name: dice.name,
            data: diceData,
          },
        ],
      });
    }
  };

  useEffect(() => {
    // 데이터가 로드되면 실행되는 효과를 정의합니다.
    if (!isLoading) {
      // 필요한 데이터 항목을 가져옵니다.
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const dice = plcData.find((item) => item.tagId === "37");

      // 차트 데이터를 업데이트합니다.
      updateChartData(newLabelItem, dice);
    }
  }, [plcData, isLoading]);

  // ApexCharts를 사용하여 Stepline 형태의 라인 차트를 렌더링합니다.
  return (
    <div>
      <ReactApexChart
        options={options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default SteppedLineChart;
