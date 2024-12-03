import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

export const Balatro = () => {
  const meshRef = useRef();

  const fragmentShader = /* glsl */ `
    #define PIXEL_SIZE_FAC 700.0
    #define SPIN_EASE 0.5
    #define colour_2 vec4(0.0,156.0/255.0,1.0,1.0)
    #define colour_1 vec4(0.85,0.2,0.2,1.0)
    #define colour_3 vec4(0.0,0.0,0.0,1.0)
    #define spin_amount 0.7
    #define contrast 1.5

    uniform float iTime;
    uniform vec2 iResolution;

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      float pixel_size = length(iResolution.xy) / PIXEL_SIZE_FAC;

      vec2 uv = (fragCoord.xy - 1. * iResolution.xy) / 1200.0;
      float uv_len = length(uv);

      float speed = (iTime * SPIN_EASE * 0.1) + 302.2;
      float new_pixel_angle = (atan(uv.y, uv.x)) + speed - SPIN_EASE * 20.0 * (1.0 * spin_amount * uv_len + (1.0 - 1.0 * spin_amount));

      uv = vec2(uv_len * cos(new_pixel_angle), uv_len * sin(new_pixel_angle));

      uv *= 30.0;
      speed = iTime * 1.0;
      vec2 uv2 = vec2(uv.x + uv.y);

      for (int i = 0; i < 5; i++) {
        uv2 += uv + cos(length(uv));
        uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
        uv -= 1.0 * cos(uv.x + uv.y) - 1. * sin(uv.x * 0.711 - uv.y);
      }

      float contrast_mod = (0.25 * contrast + 0.5 * spin_amount + 1.2);
      float paint_res = min(2.0, max(0.0, length(uv) * (0.035) * contrast_mod));
      float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
      float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
      float c3p = 1.0 - min(1.0, c1p + c2p);

      vec4 ret_col = (0.3 / contrast) * colour_1 + (1.0 - 0.3 / contrast) * (colour_1 * c1p + colour_2 * c2p + vec4(c3p * colour_3.rgb, c3p * colour_1.a)) + 0.3 * max(c1p * 5.0 - 4.0, 0.0) + 0.4 * max(c2p * 5.0 - 4.0, 0.0);
      fragColor = ret_col;
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;

  const vertexShader = /* glsl */ `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: {
        value: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
      },
    },
    fragmentShader,
    vertexShader,
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.iTime.value =
        state.clock.getElapsedTime();
    }
  });

  return (
    
    <mesh ref={meshRef} material={shaderMaterial} receiveShadow>
      <planeGeometry args={[window.innerWidth, window.innerHeight]} />
    </mesh>
  );
};
