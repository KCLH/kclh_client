import React, { useEffect } from "react";
import * as mqtt from "mqtt";
import { Html } from "@react-three/drei";

export const Controller = () => {
  const brokerUrl = "mqtt://192.168.0.106:8884";
  const client = mqtt.connect(brokerUrl);

  const sendMessage = (value) => {
    const topic = "edukit/control";
    const messageToSend = { tagId: "1", value };

    client.publish(topic, JSON.stringify(messageToSend));
    console.log("message sent", JSON.stringify(messageToSend));
  };

  useEffect(() => {
    client.on("connect", () => {
      console.log("Ok"); // 연결이 성공했을 때의 처리
    });

    return () => {
      if (client) {
        client.end(); // 컴포넌트가 언마운트될 때 MQTT 클라이언트 연결 종료
      }
    };
  }, []);

  //작업 후 return하는 코드
  return (
    <Html
      position={[-3.2, 1, 2]}
      style={{
        backgroundColor: "#f2f2f2",
        width: "350px",
        height: "450px",
      }}
    >
      <button onClick={() => sendMessage("1")}>시작</button>
      <button onClick={() => sendMessage("0")}>정지</button>
    </Html>
  );
};
