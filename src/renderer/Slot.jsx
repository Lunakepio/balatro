import { extend } from "@react-three/fiber";
import { geometry } from "maath";
import { useRef, useEffect } from "react";
import { Card } from "./Card";
import { Vector2} from "three";
import { useGameStore } from "../store/store";

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

export const Slot = () => {
  const planeWidth = 7;
  const cardCount = 8;
  const cardSpacing = planeWidth / cardCount;
  const meshRef = useRef();

  const { cards, setCards } = useGameStore();

  useEffect(() => {
    setCards(
      Array.from({ length: cardCount }, (_, index) => ({
        id: index,
        basePosition: new Vector2(
          -planeWidth / 2 + cardSpacing * (index + 0.5),
          ((Math.sin((index / (cardCount - 1)) * Math.PI)) * 0.1)
        ),
      })),
    );
  }, [cardSpacing, setCards]);

  return (
    <>
      <mesh transparent ref={meshRef}>
        <roundedPlaneGeometry args={[7, 1, 0.15]} />
        <meshBasicMaterial color="black" opacity={0.3} transparent />
      </mesh>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} basePosition={card.basePosition} />
      ))}
    </>
  );
};
