"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Body } from "@/components/factory/Edukit/Body";

export default function FactoryUI(props: any) {
  // console.log(props);

  return (
    <>
      <>{props.idFromPath}</>
      <div className="home" style={{ backgroundColor: "gray" }}>
        <Canvas camera={{ position: [1000, 0, 0] }}>
          <directionalLight position={[10, 10, 10]} />
          <Body />
          {/* <Belt />
          <ColorSensor_Body />
          <ColorSensor_G />
          <ColorSensor_R />
          <M1_Body />
          <M1_Pusher />
          <M2_Body />
          <M2_Pusher />
          <M3_Body />
          <M3_Gripper />
          <M3_Yaxis />
          <M3_Ybar />
          <TrafficLight_Body />
          <TrafficLight_Green />
          <TrafficLight_Red />
          <TrafficLight_Yellow />
          <VisionSensor /> */}
        </Canvas>
      </div>
    </>
  );
}
