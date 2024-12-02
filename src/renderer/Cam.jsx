import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export const Cam = () => {
  const camera = useRef();
  const size = useThree();

  useEffect(() => {
    if (camera.current) {
      const aspect = size.width / size.height;
      const zoomLevel = 10;

      camera.current.left = -zoomLevel * aspect;
      camera.current.right = zoomLevel * aspect;
      camera.current.top = zoomLevel;
      camera.current.bottom = -zoomLevel;

      camera.current.updateProjectionMatrix();
    }
  }, [size.width, size.height]);

  return (
    <OrthographicCamera
      position={[0, 0, 0]}
      near={0.1}
      far={1000}
      makeDefault
      ref={camera}
      rotation={[0, -Math.PI, 0]}
    />
  );
};
