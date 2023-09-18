import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

//신호등 초록
export const TrafficLight_Green = ({ OnOff }: any) => {
  // 모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader as any, "/TrafficLight_Green.glb");

  scene.traverse((o: any) => {
    if (o.type === "Mesh") {
      if (o.material.name === "color_b0f7ffff") {
        if (OnOff) {
          o.material.color = new THREE.Color(0x00ff00);
        } else {
          o.material.color = new THREE.Color(0x003300);
        }
      }
    }
  });

  //작업 후 return하는 코드
  return <primitive object={scene} position={[0, 1.35, -1.5]}></primitive>;
};
