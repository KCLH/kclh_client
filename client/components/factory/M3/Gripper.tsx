import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

//3호기 집게
export const M3_Gripper = () => {
  // 모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader as any, "/M3_Gripper.glb");

  //작업 후 return하는 코드
  return <primitive object={scene} />;
};
