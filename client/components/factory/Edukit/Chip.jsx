import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

//칩
export const Chip = ({ positionX, positionY, positionZ }) => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader, "/chip.glb");

  //작업 후 return하는 코드
  return (
    <primitive
      object={scene}
      position={[positionX, positionY, positionZ]}
    ></primitive>
  );
};
