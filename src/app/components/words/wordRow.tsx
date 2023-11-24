import { WORD_LENGTH } from "@/app/constants/constants";
import Cell from "./cell";
import { useId } from "react";
import { detectStatueCell } from "@/app/utiles/utiles";

interface WordRowProps {
  guess: string;
  answer?: string;
  withAnimation: boolean;
}

function WordRow({ guess, answer, withAnimation }: WordRowProps) {
  const cellRemaining = WORD_LENGTH - guess.length;
  const cells = guess.split("").concat(Array(cellRemaining).fill(""));
  const id = useId();

  return (
    <div className="flex">
      {cells.map((letter, index) => (
        <Cell
          tag={letter}
          status={detectStatueCell(answer, letter, index)}
          key={id + index}
          customClass={withAnimation ? " animate-[flip_1s_ease-in-out]" : ""}
        />
      ))}
    </div>
  );
}

export default WordRow;
