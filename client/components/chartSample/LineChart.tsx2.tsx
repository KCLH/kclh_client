"use client";

import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMqttClient } from "@/components/hooks/useMqttClient"; //MQTT 클라이언트 관련 로직을 처리하는 커스텀 훅
import { MyChartData } from "@/components/utils/MyChartData"; // 차트 데이터 생성 함수
import { TableDataItem } from "../chart/MqttChart.type";

function LineChart() {
  const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
  const topic = "edukit1"; // 구독할 MQTT 토픽

  const tableData = useMqttClient(brokerUrl, topic);

  // const data = ChartData(tableData);
  const filterFunc = (item: TableDataItem) => item.value > 50; // value가 50보다 큰 데이터만 선택
  const data = MyChartData(tableData, filterFunc);

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: { //  ticks 설정이 yAxes 배열 내부의 개별 축 객체 안에 위치
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  const options = {
    scales: {
      y: {
        // 'yAxes' 대신 'y'를 사용.
        beginAtZero: true, // 'ticks' 대신 바로 'beginAtZero'를 사용.
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
