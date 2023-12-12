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
  /** candiate card indices to me matched */
  const [revealedCardsIndex, setRevealedCardsIndex] = useState<number[]>([]);

  /** list of finalized matched cards */
  const [matchedCards, setMatchedCards] = useState<string[]>([]);

  const matchedTimeout = useRef<number | null>(null);
  const notMatchedTimeout = useRef<number | null>(null);

  const isCardsMatched =
    revealedCardsIndex.length === 2 &&
    emojis[revealedCardsIndex[0]] === emojis[revealedCardsIndex[1]];

  const onFlipCard = (index: number) => {
    if (isCardsMatched) return;
    setRevealedCardsIndex((revealedCardsIndex) => {
      if (revealedCardsIndex.length === 0) return [index];
      if (revealedCardsIndex.length === 1)
        return [...revealedCardsIndex, index];
      return [];
    });
  };

  useEffect(() => {
    if (isCardsMatched) {
      matchedTimeout.current = setTimeout(() => {
        setMatchedCards((matchedCards) => [
          ...matchedCards,
          emojis[revealedCardsIndex[0]],
        ]);
        setRevealedCardsIndex([]);
      }, 1000);
    } else if (revealedCardsIndex.length === 2) {
      notMatchedTimeout.current = setTimeout(() => {
        setRevealedCardsIndex([]);
      }, 500);
    }

    return () => {
      if (matchedTimeout.current) {
        clearTimeout(matchedTimeout.current);
      }
      if (notMatchedTimeout.current) {
        clearTimeout(notMatchedTimeout.current);
      }
    };
  }, [revealedCardsIndex, isCardsMatched]);

  const onClickPlayAgain: MouseEventHandler = () => {
    setRevealedCardsIndex([]);
    setMatchedCards([]);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {matchedCards.length * 2 === emojis.length ? (
        <>
          <div className="text-black text-5xl font-thin">Congratulations!</div>
          <button onClick={onClickPlayAgain}>Play Again</button>
        </>
      ) : (
        <>
          {emojis.map((emoji, index) => (
            <Card
              key={index}
              emoji={emoji}
              isRevealed={revealedCardsIndex.includes(index)}
              isMatched={matchedCards.includes(emoji)}
              onFlip={() => onFlipCard(index)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
