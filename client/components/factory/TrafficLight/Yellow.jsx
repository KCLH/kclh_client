import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

//신호등 노랑
export const TrafficLight_Yellow = ({ OnOff }) => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/TrafficLight_Yellow.glb");

  scene.traverse((o) => {
    if (o.type === "Mesh") {
      if (o.material.name === "color_b0f7ffff.004") {
        if (OnOff) {
          o.material.color = new THREE.Color(0xffff00);
        } else {
          o.material.color = new THREE.Color(0x333300);
        }
      }
    }
  });

  //작업 후 return하는 코드
  return <primitive object={scene} position={[0, 1.35, -1.5]}></primitive>;
};
