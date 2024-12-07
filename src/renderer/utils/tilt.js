import { MathUtils } from 'three';

export const tilt = (
  groupRef,
  isCardHoveredRef,
  isCardClickedRef,
  cardWorld2DPosition,
  mousePosition,
  maxRotation = Math.PI / 12
) => {
  if (isCardHoveredRef && !isCardClickedRef) {
    const xDistanceToPointer = cardWorld2DPosition.x - mousePosition.x;
    const yDistanceToPointer = cardWorld2DPosition.y - mousePosition.y;

    const targetRotationY = MathUtils.clamp(-xDistanceToPointer, -maxRotation, maxRotation);
    const targetRotationX = MathUtils.clamp(yDistanceToPointer, -maxRotation, maxRotation);

    groupRef.rotation.y = MathUtils.lerp(
      groupRef.rotation.y,
      targetRotationY,
      0.1
    );
    groupRef.rotation.x = MathUtils.lerp(
      groupRef.rotation.x,
      targetRotationX,
      0.1
    );
  } else if (!isCardHoveredRef && !isCardClickedRef) {
    groupRef.rotation.x = MathUtils.lerp(
      groupRef.rotation.x,
      0,
      0.1
    );
    groupRef.rotation.y = MathUtils.lerp(
      groupRef.rotation.y,
      0,
      0.1
    );
  }
}