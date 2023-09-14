"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Body } from "@/components/factory/Edukit/Body";
import { Belt } from "@/components/factory/Edukit/Belt";
import { TrafficLight_Green } from "@/components/factory/TrafficLight/Green";
import { TrafficLight_Yellow } from "@/components/factory/TrafficLight/Yellow";
import { TrafficLight_Red } from "@/components/factory/TrafficLight/Red";
import { ColorSensor_G } from "@/components/factory/ColorSensor/Green";
import { ColorSensor_R } from "@/components/factory/ColorSensor/Red";
import { M1_Pusher } from "@/components/factory/M1/Pusher";
import { M2_Pusher } from "@/components/factory/M2/Pusher";
import { M3_Yaxis } from "@/components/factory/M3/Yaxis";
import { M3_Ybar } from "@/components/factory/M3/Ybar";
import { M3_Gripper } from "@/components/factory/M3/Gripper";

export default function FactoryUI(props: any) {
  return (
    <>
      <div style={{ backgroundColor: "#fff", width: "100%", height: "80vh" }}>
        <Canvas camera={{ position: [0, 2, -2] }}>
          <directionalLight position={[1, 1, -1]} intensity={5} />
          {/* <OrbitControls target={[0, 0, 0]} /> */}
          <Body />
          <Belt />
          <TrafficLight_Green />
          <TrafficLight_Yellow />
          <TrafficLight_Red />
          <ColorSensor_G />
          <ColorSensor_R />
          <M1_Pusher />
          <M2_Pusher />
          <M3_Yaxis />
          <M3_Gripper />
          <M3_Ybar />
        </Canvas>
      </div>
    </>
  );
}
