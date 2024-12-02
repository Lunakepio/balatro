import { MathUtils } from "three";

export const onDragHandler = (
  e,
  mousePositionX,
  mousePositionY,
  basePosition,
  isClicked,
) => {
  if (isClicked) {
    e.x = MathUtils.lerp(e.x, mousePositionX, 0.1);
    e.y = MathUtils.lerp(e.y, mousePositionY, 0.1);
    e.z = MathUtils.lerp(e.z, 0.01, 0.1);
  } else {
    e.x = MathUtils.lerp(e.x, basePosition.x, 0.1);
    e.y = MathUtils.lerp(e.y, basePosition.y, 0.1);
    e.z = MathUtils.lerp(e.z, 0, 0.1);
  }
};
