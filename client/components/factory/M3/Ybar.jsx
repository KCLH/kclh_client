import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

//3호기 Y바
export const M3_Ybar = () => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/M3_Ybar.glb");

  //작업 후 return하는 코드
  return <primitive object={scene} />;
};
