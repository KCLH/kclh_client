import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

//2호기 부품
export const M2_Pusher = ({ positionZ }) => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/M2_Pusher.glb");

  //작업 후 return하는 코드
  return <primitive object={scene} position={[0, 1.35, positionZ]}></primitive>;
};
