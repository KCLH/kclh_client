import { useState, useEffect } from "react";
import * as mqtt from "mqtt";
import { Line } from "react-chartjs-2";
import { MqttDataItem } from "@/components/chart/MqttChart.type";

function LineChart() {
  const [tableData, setTableData] = useState<MqttDataItem[]>([]);

  useEffect(() => {
    const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
    const topic = "edukit1"; // 구독할 MQTT 토픽

    // MQTT 클라이언트 생성 및 연결
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic); // 지정한 토픽을 구독
    });

    client.on("message", (topic, message) => {
      // 메시지 수신 시 실행되는 콜백 함수
      try {
        const parsedData: { Wrapper: MqttDataItem[] } = JSON.parse(
          message.toString()
        );
        console.log("mqtt-chart.tsx:", parsedData);
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

  const data = {
    labels: tableData.map((item) => item.name),
    datasets: [
      {
        label: "# of Votes",
        data: tableData.map((item) => item.value),
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
