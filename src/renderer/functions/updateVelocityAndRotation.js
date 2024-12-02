import { MathUtils } from 'three';

export const updateVelocityAndRotation = (groupRef, prevGroupPosition, velocity) => {
  velocity.current.x = groupRef.current.position.x - prevGroupPosition.current.x;
  velocity.current.y = groupRef.current.position.y - prevGroupPosition.current.y;


  groupRef.current.rotation.z = MathUtils.lerp(
    groupRef.current.rotation.z,
    -velocity.current.x * 10,
    0.05
  );


  prevGroupPosition.current.copy(groupRef.current.position);
}