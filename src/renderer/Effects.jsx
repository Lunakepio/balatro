import { Scanline, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
export const Effects = () => {
  return (
    <EffectComposer
      stencilBuffer
      disableNormalPass
      autoClear={false}
      multisampling={4}
    >
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1}

      />
    </EffectComposer>
  );
};
