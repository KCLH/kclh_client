import { useState, useEffect } from "react";
import * as mqtt from "mqtt";
import { TableDataItem } from "@/components/chart/MqttChart.type";

export default function PLCdata() {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
    const topic = "edukit1"; // 구독할 MQTT 토픽
    // const topic = "edukit2"; // 구독할 MQTT 토픽

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
        console.log("PLCdata.tsx:", parsedData);
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
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">실시간 데이터 확인</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>tagId</th>
                <th>name</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.tagId}>
                  <td>{item.tagId}</td>
                  <td>{item.name}</td>
                  <td>{item.value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
