import { useState, useEffect } from "react";
import * as mqtt from "mqtt";

interface TableDataItem {
  tagId: string;
  name: string;
  value: number;
}

export function useMqttClient(brokerUrl: string, topic: string) {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    // MQTT 클라이언트 생성 및 연결
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic); // 지정한 토픽을 구독
    });

    client.on("message", (topic, message) => {
      // 메시지 수신 시 실행되는 콜백 함수
      try {
        const parsedData: { Wrapper: TableDataItem[] } = JSON.parse(
          message.toString()
        );
        console.log(parsedData);
        setTableData(parsedData.Wrapper);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    });

    return () => {
      if (client) {
        client.end(); // 컴포넌트가 언마운트될 때 MQTT 클라이언트 연결 종료
      }
    };
  }, [brokerUrl, topic]);

  return tableData;
}
