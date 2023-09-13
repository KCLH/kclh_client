import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

//벨트
export const Belt = () => {
  //모델의 화면과 애니메이션을 읽어오는 코드
  const { scene, animations } = useLoader(GLTFLoader, "./models/Belt.glb");
  let mixer = new THREE.AnimationMixer(scene);

  //3d모델에 포함된 animation들을 actions안에 넣는 코드
  const actions = [];
  animations.forEach((clip) => {
    actions.push(mixer.clipAction(clip));
  });

  actions[0].play();

  scene.traverse((ob) => {
    ob.scale.set(1, 1, 1);
  });

  //작업 후 return하는 코드
  return <primitive object={scene} position={[0, 0, 0]}></primitive>;
};
