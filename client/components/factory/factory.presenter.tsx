"use client";
import { Canvas } from "@react-three/fiber";

import { Body } from "@/components/factory/Edukit/Body";
import { Belt } from "@/components/factory/Edukit/Belt";
import { TrafficLight_Green } from "@/components/factory/TrafficLight/Green";

export default function FactoryUI(props: any) {
  // console.log(props);

  return (
    <>
      <div style={{ backgroundColor: "#fff", width: "100%", height: "100vh" }}>
        <Canvas camera={{ position: [1, 1, -1] }}>
          <directionalLight position={[2, 1, 1]} intensity={5} />
          <Body />
          {/* <Belt />
          <TrafficLight_Green /> */}
          {/* <ColorSensor_G />
          <ColorSensor_R />
          <M1_Pusher />
          <M2_Pusher />
          <M3_Gripper />
          <M3_Yaxis />
          <M3_Ybar />
          <TrafficLight_Red />
          <TrafficLight_Yellow /> */}
        </Canvas>
      </div>
    </>
  );
}
