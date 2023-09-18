import { useMqttClient } from "@/components/hooks/useMqttClient";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { Center } from "@react-three/drei";
import { useState, useEffect } from "react";

const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

export default function PlcDelay() {
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  const No1Delay = plcData.find((item) => item.tagId === "14");

  let DelayName;
  let DelayValue;
  if (No1Delay) {
    DelayName = No1Delay.name;
    DelayValue = No1Delay.value;
  }

  const [rotationAngle, setRotationAngle] = useState(0);

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
          color: "teal",
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
        <h1>{DelayValue}</h1>
        <div>공정반복</div>
        <div>{DelayName}</div>
      </div>
    </div>
  );
}
