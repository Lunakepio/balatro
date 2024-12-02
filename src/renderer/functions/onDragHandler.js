import { MathUtils } from "three";

export const onDragHandler = (
  e,
  mousePositionX,
  mousePositionY,
  basePosition,
  isClicked,
  shouldDrag,
  isSelected
) => {
  if (isClicked && shouldDrag) {
    e.x = MathUtils.lerp(e.x, mousePositionX, 0.1);
    e.y = MathUtils.lerp(e.y, mousePositionY, 0.1);
    e.z = MathUtils.lerp(e.z, 0.01, 0.1);
  }
  else if(!isClicked && !shouldDrag) {
    e.x = MathUtils.lerp(e.x, basePosition.x, 0.1);
    e.y = MathUtils.lerp(e.y, basePosition.y + (isSelected ? 0.5 : 0), 0.1);
    e.z = MathUtils.lerp(e.z, 0, 0.1);
  }
};
