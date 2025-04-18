import { extend, useLoader } from "@react-three/fiber";
import { geometry } from "maath";
import { useRef, useEffect } from "react";
import { Card } from "./Card";
import { Vector2, TextureLoader} from "three";
import { useGameStore } from "../store/store";

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

export const Slot = () => {
  const planeWidth = 7;
  const cardCount = 8;
  const cardSpacing = planeWidth / cardCount;
  const meshRef = useRef();
  
  const materials = [0, 1, 2];

  const { cards, setCards } = useGameStore();

  const texture = useLoader(TextureLoader, "./joker.webp");
  useEffect(() => {
    let isCancelled = false;
  
    const delayBetweenCards = 100;
    const newCards = [];
  
    const placeCard = (index) => {
      if (index >= cardCount || isCancelled) return;
  
      const newCard = {
        id: index,
        basePosition: new Vector2(
          -planeWidth / 2 + cardSpacing * (index + 0.5),
          Math.sin((index / (cardCount - 1)) * Math.PI) * 0.1
        ),
      };
  
      newCards.push(newCard);
      setCards([...newCards]);
  
      setTimeout(() => placeCard(index + 1), delayBetweenCards);
    };
  
    setTimeout(() => {
      placeCard(0);
    }, 3000)
  
    return () => {
      isCancelled = true;
    };
  }, [cardCount, cardSpacing, setCards]);

  return (
    <>
      <mesh transparent ref={meshRef} position={[0, 0, 0]}>
        <roundedPlaneGeometry args={[7, 1, 0.15]} />
        <meshBasicMaterial color="black" opacity={0.3} transparent />
      </mesh>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} basePosition={card.basePosition} texture={texture} material={materials[card.id % materials.length]} />
      ))}
    </>
  );
};
