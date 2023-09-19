import { useMqttClient } from "@/components/hooks/useMqttClient";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { useState, useEffect } from "react";

export default function PlcDelay({ brokerUrl, eduKitTopic }) {
  // const brokerUrl = "mqtt://192.168.0.106:8884";
  // const topic = "edukit1";

  const [plcData, setPlcData] = useState(null); // 초기값을 null로 설정
  const [rotationAngle, setRotationAngle] = useState(0);

  // const { plcData } = useMqttClient(brokerUrl, eduKitTopic);

  const { plcData: mqttPlcData, isLoading } = useMqttClient(
    brokerUrl,
    eduKitTopic
  );

  useEffect(() => {
    // MQTT 데이터를 받아와서 state 업데이트
    if (!isLoading && mqttPlcData) {
      setPlcData(mqttPlcData);
    }
  }, [mqttPlcData, isLoading]);

  const No1Delay = plcData ? plcData.find((item) => item.tagId === "14") : null;

  let DelayName;
  let DelayValue;
  if (No1Delay) {
    DelayName = No1Delay.name;
    DelayValue = No1Delay.value;
  }

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationAngle((prevAngle) => prevAngle + 10); // 매번 10도씩 회전
    }, 100); // 매 100밀리초마다 각도 변경

    return () => {
      clearInterval(rotationInterval); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <HourglassTopRoundedIcon
        style={{
          fontSize: "64px",
          transformOrigin: "center",
          transform: `rotate(${rotationAngle}deg)`,
          transition: "transform 0.1s linear",
          color: "#1B998B",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "700" }}>공정반복</div>
        {plcData !== null ? (
          <>
            <h1>{DelayValue}</h1>
            <div>{DelayName}</div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
