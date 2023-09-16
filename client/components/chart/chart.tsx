import React, { useEffect } from "react";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const brokerUrls = ["mqtt://example.com"]; // MQTT 브로커의 URL
const topics = ["chartData"]; // 구독할 MQTT 토픽

function ChartComponent() {
  const { mqttData, isLoading } = useMqttClient(brokerUrls[0], topics[0]);

  useEffect(() => {
    // MQTT 데이터를 가져오는 로직 및 처리
  }, []); // 이펙트 의존성 배열은 필요에 따라 추가

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <LineChart mqttData={mqttData} />
      <PieChart mqttData={mqttData} />
      <BarChart mqttData={mqttData} />
    </div>
  );
}

export default ChartComponent;
