import { Image } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector2, Vector3 } from "three";
import { shake, cardHover, cardHoverOut } from "./tweens";
import { onDragHandler, tilt, updateVelocityAndRotation } from "./utils";
import { useGameStore } from "../store/store";
import PropTypes from "prop-types";

export const Card = ({ id, basePosition }) => {
  const shadowRef = useRef();
  const cardRef = useRef();
  const isCardHoveredRef = useRef(false);
  const isCardClickedRef = useRef(false);
  const groupRef = useRef();
  const divider = 100;
  const prevGroupPosition = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));
  const cardSpacing = 7 / 8;

  const timeMultiplier = 1;
  const rotationAmplifier = 0.2;

  const { cards, updateCardPosition } = useGameStore();
  const clickTime = useRef(0);

  const shouldDragThreshold = 0.2;

  const isSelected = useRef(false);

  useFrame((state, delta) => {
    if (!cardRef.current) return;
    const time = state.clock.getElapsedTime();
    const { pointer, size, camera } = state;
    const cardWorldPosition = cardRef.current.getWorldPosition(new Vector3());
    const cameraPosition = camera.position;
    const cardWorld2DPosition = new Vector2(
      cardWorldPosition.x,
      cardWorldPosition.y
    );
    const shouldDrag = clickTime.current > shouldDragThreshold;

    if (
      groupRef.current &&
      !isCardHoveredRef.current &&
      !isCardClickedRef.current
    ) {
      const oscillation =
        Math.sin((time - id * 0.2) * timeMultiplier) * rotationAmplifier;

      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        oscillation - cardWorld2DPosition.x * 0.1,
        0.1
      );
    }
    updateVelocityAndRotation(groupRef, prevGroupPosition, velocity);
    const frustumSize = 5;
    const aspect = size.width / size.height;

    const frustumWidth = frustumSize * aspect * 2;
    const frustumHeight = frustumSize * 2;

    const mousePosition = new Vector2(
      pointer.x * (frustumWidth / 2) + cameraPosition.x,
      pointer.y * (frustumHeight / 2) + cameraPosition.y
    );

    onDragHandler(
      groupRef.current.position,
      mousePosition.x,
      mousePosition.y,
      basePosition,
      isCardClickedRef.current,
      shouldDrag,
      isSelected.current
    );

    tilt(
      groupRef.current,
      isCardHoveredRef.current,
      isCardClickedRef.current,
      cardWorld2DPosition,
      mousePosition
    );

    if (isCardClickedRef.current) {
      clickTime.current += delta;
      const newIndex = cards.findIndex(
        (c) =>
          c.basePosition.x > cardWorld2DPosition.x - cardSpacing / 2 &&
          c.basePosition.x < cardWorld2DPosition.x + cardSpacing / 2
      );

      updateCardPosition(id, newIndex);
    } else {
      clickTime.current = 0;
    }
    shouldDrag ? (isSelected.current = false) : null;
  });
  return (
    <group ref={groupRef}>
      <Image
        url="./shadow.webp"
        transparent={true}
        position={[0, -0.05, -0.1]}
        opacity={0.3}
        ref={shadowRef}
      >
        <planeGeometry args={[73 / divider, 97 / divider]} />
      </Image>
      <Image
        castShadow
        ref={cardRef}
        url="./ace.webp"
        transparent={true}
        onPointerDown={(e) => {
          e.stopPropagation();
          isCardClickedRef.current = true;
          isSelected.current = !isSelected.current;
          document.body.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          isCardClickedRef.current = false;
          cardHoverOut(groupRef.current.scale);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!isCardClickedRef.current) {
            shake(cardRef.current.rotation);
            cardHover(groupRef.current.scale);
            isCardHoveredRef.current = true;
          }
          document.body.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          if (!isCardClickedRef.current) {
            cardHoverOut(groupRef.current.scale);
            isCardHoveredRef.current = false;
          }
            document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[73 / divider, 97 / divider]} />
      </Image>
    </group>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  basePosition: PropTypes.instanceOf(Vector2).isRequired,
};
