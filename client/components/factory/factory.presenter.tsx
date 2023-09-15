"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMqttClient } from "@/components/hooks/useMqttClient";

import { Body } from "@/components/factory/Edukit/Body";
import { Belt } from "@/components/factory/Edukit/Belt";
import { Chip } from "@/components/factory/Edukit/Chip";
import { TrafficLight_Green } from "@/components/factory/TrafficLight/Green";
import { TrafficLight_Yellow } from "@/components/factory/TrafficLight/Yellow";
import { TrafficLight_Red } from "@/components/factory/TrafficLight/Red";
import { ColorSensor_G } from "@/components/factory/ColorSensor/Green";
import { ColorSensor_R } from "@/components/factory/ColorSensor/Red";
import { M1_Pusher } from "@/components/factory/M1/Pusher";
import { M2_Pusher } from "@/components/factory/M2/Pusher";
import { M3 } from "@/components/factory/M3/M3";

export default function FactoryUI(props: any) {
  //MQTT에서 필요한 데이터 추출하기
  const brokerUrl = "mqtt://192.168.0.106:8884";
  const topic = "edukit1";
  const { plcData } = useMqttClient(brokerUrl, topic);

  const LightGMqttData = plcData.find((item) => item.tagId === "18");
  const LightYMqttData = plcData.find((item) => item.tagId === "19");
  const LightRMqttData = plcData.find((item) => item.tagId === "20");
  const ColorRMqttData = plcData.find((item) => item.tagId === "6");
  const ColorGMqttData = plcData.find((item) => item.tagId === "12");
  const M1MqttData = plcData.find((item) => item.tagId === "3");
  const M2MqttData = plcData.find((item) => item.tagId === "4");
  const M3_1MqttData = plcData.find((item) => item.tagId === "21");
  const M3_2MqttData = plcData.find((item) => item.tagId === "22");
  const Chip2 = plcData.find((item) => item.tagId === "24");
  const Chip3 = plcData.find((item) => item.tagId === "32");
  const Chip3_G = plcData.find((item) => item.tagId === "40");

  //추출한 데이터 가공하기
  //1호기
  let M1Position;
  if (M1MqttData && M1MqttData?.value) {
    M1Position = -1.58;
  } else {
    M1Position = -1.5;
  }
  //2호기
  let M2Position;
  if (M2MqttData && M2MqttData?.value) {
    M2Position = -1.55;
  } else {
    M2Position = -1.5;
  }
  //3호기 1축
  let M3_1Position;
  if (M3_1MqttData && M3_1MqttData?.value >= 0) {
    M3_1Position = (M3_1MqttData?.value / 1303155) * 0.155 + 1.35;
    M3_1Position.toFixed(3);
  } else {
    M3_1Position = 1.35;
  }
  //3호기 2축
  let M3_2Position;
  if (M3_2MqttData && M3_2MqttData?.value >= 0) {
    M3_2Position = M3_2MqttData?.value / 21002500;
    M3_2Position.toFixed(3);
  } else {
    M3_2Position = 0;
  }
  //칩
  let ChipPositionX, ChipPositionY, ChipPositionZ;
  if (M1MqttData?.value) {
    ChipPositionX = 0;
    ChipPositionY = 1.35;
    ChipPositionZ = -1.5;
  }
  if (ColorRMqttData?.value) {
    ChipPositionX = -0.08;
    ChipPositionY = 1.35;
    ChipPositionZ = -1.5;
  }
  if (Chip2?.value) {
    ChipPositionX = -0.17;
    ChipPositionY = 1.35;
    ChipPositionZ = -1.5;
  }
  if (Chip3?.value) {
    ChipPositionX = -0.435;
    ChipPositionY = 1.35;
    ChipPositionZ = -1.5;
  }
  if (Chip3_G?.value) {
    ChipPositionX = 0;
    ChipPositionY = 1.49;
    ChipPositionZ = -1.42;
  }

  return (
    <>
      <div style={{ backgroundColor: "#fff", width: "100%", height: "80vh" }}>
        <Canvas camera={{ position: [0, 2, -2] }}>
          <directionalLight position={[1, 1, -1]} intensity={5} />
          <OrbitControls target={[0, 0, 0]} />
          <Body />
          <Belt />
          <Chip
            positionX={ChipPositionX}
            positionY={ChipPositionY}
            positionZ={ChipPositionZ}
          />
          <TrafficLight_Green OnOff={LightGMqttData?.value} />
          <TrafficLight_Yellow OnOff={LightYMqttData?.value} />
          <TrafficLight_Red OnOff={LightRMqttData?.value} />
          {ColorGMqttData?.value && <ColorSensor_G />}
          {ColorRMqttData?.value && <ColorSensor_R />}
          <M1_Pusher positionZ={M1Position} />
          <M2_Pusher positionZ={M2Position} />
          <M3 positionY={M3_1Position} rotationY={M3_2Position} />
        </Canvas>
      </div>
    </>
  );
}
