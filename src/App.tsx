import { useEffect, useRef, useState } from "react";
import type { FC, MouseEventHandler } from "react";

import { Card } from "./components/Card";

import "./App.css";

const emojis = [
  "😐",
  "🐱",
  "🐭",
  "😂",
  "😆",
  "🙃",
  "😅",
  "😴",
  "😐",
  "🐱",
  "🐭",
  "😂",
  "😆",
  "🙃",
  "😅",
  "😴",
];

emojis.sort(() => Math.random() - 0.5);

const App: FC = () => {
  /** candiate card index to me matched with the other card */
  const [revealedCardsIndex, setRevealedCardsIndex] = useState<number[]>([]);

  /** list of finalized matched cards */
  const [matchedCards, setMatchedCards] = useState<string[]>([]);

  const timeout = useRef<number | null>(null);

  const onFlipCard = (index: number) => {
    setRevealedCardsIndex((revealedCardsIndex) => {
      if (revealedCardsIndex.length === 0) return [index];
      if (revealedCardsIndex.length === 1)
        return [...revealedCardsIndex, index];
      return [];
    });
  };

  useEffect(() => {
    timeout.current = setTimeout(() => {
      if (emojis[revealedCardsIndex[0]] === emojis[revealedCardsIndex[1]]) {
        setMatchedCards((matchedCards) => [
          ...matchedCards,
          emojis[revealedCardsIndex[0]],
        ]);
      }
      setRevealedCardsIndex([]);
    }, 2000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [revealedCardsIndex]);

  const onClickPlayAgain: MouseEventHandler = () => {
    setRevealedCardsIndex([]);
    setMatchedCards([]);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {emojis.map((emoji, index) => (
        <Card
          key={index}
          emoji={emoji}
          isRevealed={revealedCardsIndex.includes(index)}
          isMatched={matchedCards.includes(emoji)}
          onFlip={() => onFlipCard(index)}
        />
      ))}
      {matchedCards.length === emojis.length && (
        <>
          <div className="text-black text-5xl font-thin">Congratulations!</div>
          <button onClick={onClickPlayAgain}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default App;
