import { useState, useEffect } from "react";
import * as mqtt from "mqtt";
import { TableDataItem } from "@/components/chart/Chart.type";

// MQTT 서버로부터 데이터를 받아와서 상태로 저장하는 함수.
export function useMqttClient(brokerUrl: string, topic: string) {
  // 데이터를 저장할 상태를 생성.
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    // MQTT 클라이언트를 생성하고 서버에 연결.
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      // 지정한 토픽을 구독합니다. 새 메시지가 오면 알림.
      client.subscribe(topic); // 지정한 토픽을 구독
    });

    client.on("message", (topic, message) => {
      // 메시지가 도착하면 이 함수가 호출.
      // 메시지 수신 시 실행되는 콜백 함수
      try {
        // 메시지는 문자열 형태이므로 JSON 형태로 변환.
        const parsedData: { Wrapper: TableDataItem[] } = JSON.parse(
          message.toString()
        );
        console.log("parsedData:", parsedData);
        // 변환된 데이터를 상태에 저장. 이후 차트 그리기 등에서 사용.
        setTableData(parsedData.Wrapper);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    });

    return () => {
      if (client) {
        client.end(); // 컴포넌트가 언마운트되거나 이 effect가 다시 실행되기 전에 클라이언트 연결을 종료.
      }
    };
  }, [brokerUrl, topic]);

  return tableData;
}
