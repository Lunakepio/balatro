import { Image } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { shake } from "./gsap/shake";
import { cardHover, cardHoverOut } from "./gsap/cardHover";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector2, Vector3 } from "three";

export const Card = () => {
  const shadowRef = useRef();
  const cardRef = useRef();
  const isCardHoveredRef = useRef(false);
  const isCardClickedRef = useRef(false);
  const groupRef = useRef();
  const divider = 100;
  const prevMousePosition = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));

  const timeMultipler = 1;
  const rotationAmplifier = 0.2;
  const tiltAmplifier = 2;

  useFrame((state) => {
    if (!cardRef.current) return;
    const time = state.clock.getElapsedTime();
    const delta = state.clock.getDelta();
    const pointer = state.pointer;
    const cardWorldPosition = cardRef.current.getWorldPosition(new Vector3());
    const cardWorld2DPosition = new Vector2(
      cardWorldPosition.x,
      cardWorldPosition.y
    );

    const mousePosition = new Vector2(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2
    );

    if (groupRef.current && !isCardHoveredRef.current) {
      groupRef.current.rotation.z =
        MathUtils.lerp(
          groupRef.current.rotation.z,
          Math.sin(time * timeMultipler) * rotationAmplifier,
          0.05
        );
      }



    // if (isCardHoveredRef.current && !isCardClickedRef.current) {


    //   groupRef.current.rotation.y = MathUtils.lerp(
    //     groupRef.current.rotation.y,
    //     0,
    //     0.1
    //   );
    //   groupRef.current.rotation.x = MathUtils.lerp(
    //     groupRef.current.rotation.x,
    //     0,
    //     0.1
    //   );

    //   const xDistanceToPointer = cardWorld2DPosition.x - mousePosition.x;
    //   const yDistanceToPointer = cardWorld2DPosition.y - mousePosition.y;

    //   cardRef.current.rotation.y = -xDistanceToPointer * tiltAmplifier;
    //   cardRef.current.rotation.x = yDistanceToPointer * tiltAmplifier;
    // }


    if (isCardClickedRef.current) {
      velocity.current.x = mousePosition.x - prevMousePosition.current.x;
      velocity.current.y = mousePosition.y - prevMousePosition.current.y;
  
      groupRef.current.position.x = MathUtils.lerp(
        groupRef.current.position.x,
        mousePosition.x,
        0.1
      );
      groupRef.current.position.y = MathUtils.lerp(
        groupRef.current.position.y,
        mousePosition.y,
        0.1
      );
  
  
      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        -velocity.current.x * 10,
        0.05
      );
  
  
      prevMousePosition.current.copy(mousePosition);
    } else {
      groupRef.current.position.x = MathUtils.lerp(
        groupRef.current.position.x,
        0,
        0.05
      );
      groupRef.current.position.y = MathUtils.lerp(
        groupRef.current.position.y,
        0,
        0.05
      );

      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        0.05
      );
    }
    
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
        ref={cardRef}
        url="./ace.webp"
        transparent={true}
        onPointerDown={(e) => {
          e.stopPropagation();
          isCardClickedRef.current = true;
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          isCardClickedRef.current = false;
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if(!isCardClickedRef.current) {
            shake(cardRef.current.rotation);
            // cardHover(cardRef.current.position);
            isCardHoveredRef.current = true;
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          if(!isCardClickedRef.current) {
            // cardHoverOut(cardRef.current.position, cardRef.current.rotation);
            isCardHoveredRef.current = false;
          }
        }}
      >
        <planeGeometry args={[73 / divider, 97 / divider]} />
      </Image>
    </group>
  );
};
