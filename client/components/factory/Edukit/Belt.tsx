import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

//벨트
export const Belt = () => {
  // 모델의 화면과 애니메이션을 읽어오는 코드
  const { scene } = useLoader(GLTFLoader as any, "/Belt.glb");
  let mixer = new THREE.AnimationMixer(scene);

  // //3d모델에 포함된 animation들을 actions안에 넣는 코드
  // const actions = [];
  // animations.forEach((clip) => {
  //   actions.push(mixer.clipAction(clip));
  // });

  // //속도 조절 및 animation 작동 코드
  // useFrame((state, delta) => {
  //   mixer.update(delta);
  // });

  // actions[0].play();

  //작업 후 return하는 코드
  return <primitive object={scene} position={[0, 1.35, -1.505]}></primitive>;
};
