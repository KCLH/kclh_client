import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

//3호기 Y바
export const M3_Ybar = () => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/M3_Ybar.glb");

  //미니 대시보드
  const router = useRouter();
  const [openMiniD, setOpenMiniD] = useState(false);
  const miniD = [];
  const handleMiniD = () => {
    setOpenMiniD(!openMiniD);
  };
  scene.traverse((o) => {
    miniD.push(
      <Html
        position={[0.8, 0.53, 0]}
        style={{
          backgroundColor: "#ff0000",
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
              status:ok
            </div>
          }
        </div>
      </Html>
    );
  });

  //작업 후 return하는 코드
  return (
    <primitive object={scene} onClick={handleMiniD}>
      {miniD}
    </primitive>
  );
};
