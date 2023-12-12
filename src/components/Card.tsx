import { FC } from "react";

interface CardProps {
  emoji: string;
  isRevealed?: boolean;
  isMatched?: boolean;
  onFlip: (emoji: string) => void;
}

export const Card: FC<CardProps> = ({
  emoji,
  isRevealed,
  isMatched,
  onFlip,
}) => {
  return (
    <div
      className={`${isRevealed ? "bg-white" : "bg-green-500"} ${
        isMatched ? "opacity-0" : ""
      } border-solid border-gray-300 border-[1px] text-4xl text-blue-950 flex items-center justify-center shadow-md rounded-lg w-24 h-32 hover:shadow-xl cursor-pointer hover:scale-110 transition-all`}
      onClick={() => onFlip(emoji)}
    >
      {isRevealed && emoji}
    </div>
  );
};
