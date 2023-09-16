"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";

//2호기 부품
export const M2_Pusher = ({ positionZ, output, onOff }) => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/M2_Pusher.glb");

  //미니 대시보드
  const router = useRouter();
  //대시보드 OnOff
  const [openMiniD, setOpenMiniD] = useState(false);
  const miniD = [];
  const handleMiniD = () => {
    setOpenMiniD(!openMiniD);
  };
  //대시보드 내용
  miniD.push(
    <Html
      key={"M2"}
      position={[0.8, 0.53, 0]}
      style={{
        backgroundColor: "#f2f2f2",
        width: "350px",
        height: "450px",
        display: openMiniD ? "block" : "none",
      }}
    >
      <div className="miniD" onClick={() => router.push("/")}>
        {
          <div>
            M2
            <br />
            <GaugeChart
              id="M2OnOff"
              nrOfLevels={2}
              colors={["green", "red"]}
              arcWidth={0.3}
              percent={onOff}
              hideText={true}
              animate={false}
            />
            <br />
            생산량 : {output}
          </div>
        }
      </div>
    </Html>
  );

  //작업 후 return하는 코드
  return (
    <primitive
      object={scene}
      position={[0, 1.35, positionZ]}
      onClick={handleMiniD}
    >
      {miniD}
    </primitive>
  );
};
