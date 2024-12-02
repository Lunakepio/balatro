import { Image } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { shake } from "./gsap/shake";
import { cardHover, cardHoverOut } from "./gsap/cardHover";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector2, Vector3 } from "three";
import { onDragHandler } from "./functions/onDragHandler";
import { updateVelocityAndRotation } from "./functions/updateVelocityAndRotation";
import { tilt } from "./functions/tilt";
import { useGameStore } from "../store/store";

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

  const { cards, removeCard, updateCardPosition } = useGameStore();
  const clickTime = useRef(0);
  
  const shouldDragThreshold = 0.2;
  
  const isSelected = useRef(false);
  
  useFrame((state, delta) => {
    if (!cardRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;
    const cardWorldPosition = cardRef.current.getWorldPosition(new Vector3());
    const cardWorld2DPosition = new Vector2(
      cardWorldPosition.x,
      cardWorldPosition.y,
    );
    const shouldDrag = clickTime.current > shouldDragThreshold;

    const mousePosition = new Vector2(
      (pointer.x * state.viewport.width) / 2,
      (pointer.y * state.viewport.height) / 2,
    );

    if (
      groupRef.current &&
      !isCardHoveredRef.current &&
      !isCardClickedRef.current
    ) {
  
    
      const oscillation = Math.sin((time - id * 0.2) * timeMultiplier) * rotationAmplifier;
    

      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        oscillation - (cardWorld2DPosition.x * 0.1),
        0.1
      );
      
    }
    updateVelocityAndRotation(groupRef, prevGroupPosition, velocity);
    
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
      mousePosition,
    );

    if (isCardClickedRef.current) {
      clickTime.current += delta
      const newIndex = cards.findIndex(
        (c) =>
          c.basePosition.x > cardWorld2DPosition.x - cardSpacing / 2 &&
          c.basePosition.x < cardWorld2DPosition.x + cardSpacing / 2,
      );

      updateCardPosition(id, newIndex);
    } else {
      clickTime.current = 0;
    }
    shouldDrag ? isSelected.current = false : null;
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
          isSelected.current = !isSelected.current
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
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          if (!isCardClickedRef.current) {
            cardHoverOut(groupRef.current.scale);
            isCardHoveredRef.current = false;
          }
        }}
      >
        <planeGeometry args={[73 / divider, 97 / divider]} />
      </Image>
    </group>
  );
};
