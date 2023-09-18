"use client";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";

//3호기 Y바
export const M3_Ybar = ({ output, onOff }: any) => {
  // 모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader as any, "/M3_Ybar.glb");

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
      key={"M3"}
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
            M3
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
    <primitive object={scene} onClick={handleMiniD}>
      {miniD}
    </primitive>
  );
};
