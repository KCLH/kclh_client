"use client";

import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useMqttClient } from "@/components/hooks/useMqttClient"; //MQTT 클라이언트 관련 로직을 처리하는 커스텀 훅
import { MyChartData } from "@/components/utils/MyChartData"; // 차트 데이터 생성 함수

function DoughnutChart() {
  const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
  const topic = "edukit1"; // 구독할 MQTT 토픽

  const tableData = useMqttClient(brokerUrl, topic);

  const data = MyChartData(tableData);

  return <Doughnut data={data} />;
}

export default DoughnutChart;
