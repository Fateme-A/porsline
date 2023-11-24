import { useId } from "react";
import WordRow from "./wordRow";
import { findCurrentGuessIndex } from "@/app/utiles/utiles";

interface WordListProps {
  guesses: string[];
  currentGuess: string;
  answer: string;
}

function WordList({ guesses, currentGuess, answer }: WordListProps) {
  const id = useId();
  const currentIndex = findCurrentGuessIndex(guesses);

  return (
    <div className="mb-4">
      {guesses?.map((guess, index) =>
        currentIndex === index ? (
          <WordRow
            guess={currentGuess}
            key={id + index}
            withAnimation={false}
          />
        ) : (
          <WordRow
            guess={guess}
            key={id + index}
            answer={answer}
            withAnimation={currentIndex - 1 === index}
          />
        )
      )}
    </div>
  );
}

export default WordList;
