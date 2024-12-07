// OrthographicCameraComponent.jsx
import { useEffect, useRef } from "react";
import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Cam = () => {
  const cameraRef = useRef();
  const { size } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      const aspect = size.width / size.height;
      const frustumSize = 5;

      cameraRef.current.left = -frustumSize * aspect;
      cameraRef.current.right = frustumSize * aspect;
      cameraRef.current.top = frustumSize;
      cameraRef.current.bottom = -frustumSize;

      cameraRef.current.updateProjectionMatrix();
    }
  }, [size]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 10]}
      near={0.1}
      far={1000}
    />
  );
};