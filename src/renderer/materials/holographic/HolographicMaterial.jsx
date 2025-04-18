import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

export const useHolographicMaterial = (texture, groupRef) => {
  const materialRef = useRef();


  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uRotation : { value : 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    materialRef.current = mat;
    return mat;
  }, [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uRotation.value = new Vector2(groupRef.current.rotation.y * -2, groupRef.current.rotation.x * 2);
    }
  })

  return material;
};
