import { Canvas, useThree } from "@react-three/fiber";
import { Cam } from "./Cam";

export const WebGLCanvas = ({ children }) => {

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false, depth: false, stencil: false }}
    >
      {children}
      {/* <Cam /> */}
    </Canvas>
  );
};
