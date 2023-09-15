import { M3_Ybar } from "@/components/factory/M3/Ybar";
import { M3_Gripper } from "@/components/factory/M3/Gripper";
import { M3_Yaxis } from "@/components/factory/M3/Yaxis";

export const M3 = ({ positionY, rotationY }) => {
  return (
    <mesh position={[0, positionY, -1.5]}>
      <M3_Yaxis />
      <mesh position={[-0.12, 0.158, -0.18]} rotation={[0, -rotationY, 0]}>
        <mesh position={[0.122, -0.1575, 0.175]}>
          <mesh position={[-0.221, 0.16, -0.177]} rotation={[0, rotationY, 0]}>
            <mesh position={[0.224, -0.16, 0.178]}>
              <M3_Gripper />
            </mesh>
          </mesh>
          <M3_Ybar />
        </mesh>
      </mesh>
    </mesh>
  );
};
