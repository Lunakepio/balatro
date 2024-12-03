import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';

export const WebGLCanvas = ({ children }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false, depth: false, stencil: false }}
    >
      {children}
    </Canvas>
  );
};

WebGLCanvas.propTypes = {
  children: PropTypes.node,
};

WebGLCanvas.defaultProps = {
  children: null,
};
