import { OrthographicCamera } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useControls } from "leva";

export const Cam = () => {
  const camera = useRef();
  const { width, height } = useControls("Viewport", {
    width: { value: 10, step: 0.1 },
    height: { value: 10, step: 0.1 },
  });

  useEffect(() => {
    if (camera.current) {
      const aspect = width / height;
      const zoomLevel = 5;

      camera.current.left = -zoomLevel * aspect;
      camera.current.right = zoomLevel * aspect;
      camera.current.top = zoomLevel * aspect;
      camera.current.bottom = -zoomLevel;

      camera.current.updateProjectionMatrix();
    }
  }, [width, height]);

  return (
    <OrthographicCamera
      ref={camera}
      position={[0, 0, 10]}
      rotation={[0, 0, 0]} 
      near={0.1}
      far={100}
      makeDefault
    />
  );
};