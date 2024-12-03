import { create } from "zustand";

export const useGameStore = create((set) => ({
  cards: [],
  addCard: (card) => {
    set((state) => ({
      cards: [...state.cards, card],
    }));
  },
  removeCard: (id) => {
    set((state) => {
      const updatedCards = state.cards.filter((c) => c.id !== id);

      const planeWidth = 7;
      const cardCount = updatedCards.length;
      const cardSpacing = planeWidth / cardCount;

      updatedCards.forEach((card, index) => {
        card.basePosition.set(-planeWidth / 2 + cardSpacing * (index + 0.5), (Math.sin((index / (cardCount - 1)) * Math.PI)) * 0.1);
      });

      return { cards: updatedCards };
    });
  },
  setCards: (cards) => {
    set(() => ({
      cards,
    }));
  },
  updateCardPosition: (id, newIndex) => {
    set((state) => {
      const cardIndex = state.cards.findIndex((card) => card.id === id);
      const [movedCard] = state.cards.splice(cardIndex, 1);
      state.cards.splice(newIndex, 0, movedCard);

      const planeWidth = 7;
      const cardCount = state.cards.length;
      const cardSpacing = planeWidth / cardCount;

      state.cards.forEach((card, index) => {
        card.basePosition.set(-planeWidth / 2 + cardSpacing * (index + 0.5), (Math.sin((index / (cardCount - 1)) * Math.PI)) * 0.1);
      });

      return { cards: [...state.cards] };
    });
  },
}));
