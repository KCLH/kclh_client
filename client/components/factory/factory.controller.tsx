import React, { useState, useEffect } from "react";
import * as mqtt from "mqtt";

export const Controller = () => {
  const [inputValue, setInputValue] = useState("");

  const brokerUrl = "mqtt://192.168.0.106:8884";
  const client = mqtt.connect(brokerUrl);

  const sendMessage = (id: string, value: string) => {
    const topic = "edukit1/control";
    const messageToSend = { tagId: id, value };
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
    <div
      style={{
        backgroundColor: "#f2f2f2",
        width: "350px",
        height: "450px",
      }}
    >
      <button onClick={() => sendMessage("1", "1")}>공장 가동 시작</button>
      <button onClick={() => sendMessage("1", "0")}>공장 가동 정지</button>
      <button onClick={() => sendMessage("9", "1")}>1호기 가동 시작</button>
      <button onClick={() => sendMessage("9", "0")}>1호기 가동 정지</button>
      <button onClick={() => sendMessage("10", "1")}>2호기 가동 시작</button>
      <button onClick={() => sendMessage("10", "0")}>2호기 가동 정지</button>
      <button onClick={() => sendMessage("11", "1")}>3호기 가동 시작</button>
      <button onClick={() => sendMessage("11", "0")}>3호기 가동 정지</button>
      <button onClick={() => sendMessage("12", "1")}>컬러센서 가동 시작</button>
      <button onClick={() => sendMessage("12", "0")}>컬러센서 가동 정지</button>
      <button onClick={() => sendMessage("13", "1")}>비전센서 가동 시작</button>
      <button onClick={() => sendMessage("13", "0")}>비전센서 가동 정지</button>
      <button onClick={() => sendMessage("31", "0")}>색 선별 시작</button>
      <button onClick={() => sendMessage("31", "1")}>색 선별 중지</button>
      <button onClick={() => sendMessage("100", "11")}>위로 이동 시작</button>
      <button onClick={() => sendMessage("100", "10")}>위로 이동 중지</button>
      <button onClick={() => sendMessage("100", "21")}>아래로 이동 시작</button>
      <button onClick={() => sendMessage("100", "20")}>아래로 이동 중지</button>
      <button onClick={() => sendMessage("200", "11")}>앞으로 이동 시작</button>
      <button onClick={() => sendMessage("200", "10")}>앞으로 이동 중지</button>
      <button onClick={() => sendMessage("200", "21")}>뒤로 이동 시작</button>
      <button onClick={() => sendMessage("200", "20")}>뒤로 이동 중지</button>
      <button onClick={() => sendMessage("300", "0")}>비상정지</button>
      <button
        onClick={() => {
          sendMessage("300", "1");
          sendMessage("8", "1");
        }}
      >
        비상정지 해제
      </button>
      <button onClick={() => sendMessage("8", "1")}>리셋</button>
      <form onSubmit={() => sendMessage("14", inputValue)}>
        <input
          type="text"
          placeholder="칩 딜레이 시간(ms)"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">변경</button>
      </form>
      <form onSubmit={() => sendMessage("38", inputValue)}>
        <input
          type="text"
          placeholder="불량품 기준 숫자"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">변경</button>
      </form>
    </div>
  );
};
