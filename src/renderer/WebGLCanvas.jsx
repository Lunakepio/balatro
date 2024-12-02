import { Canvas} from "@react-three/fiber";

export const WebGLCanvas = ({ children }) => {

  return (
    <Canvas
      dpr={[1, 2]}
      // shadows
      gl={{ antialias: false, alpha: false, depth: false, stencil: false }}
    >
      {children}
    </Canvas>
  );
};
