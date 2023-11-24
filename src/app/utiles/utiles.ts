import { WORD_LENGTH } from "../constants/constants";
import { LetterStatus } from "../models/models";

export const getLetterColor = (status: LetterStatus): string => {
  switch (status) {
    case "hit":
      return "bg-green";
    case "miss":
      return "bg-gray-200";
    case "match":
      return "bg-yellow";
    default:
      return "bg-gray-100";
  }
};

export const isSpecialKey = (key: string): boolean => {
  const specialKeys = ["Enter", "Backspace"];
  return specialKeys.includes(key);
};

export const findCurrentGuessIndex = (array: string[]): number => {
  return array.findIndex((element) => element.length < WORD_LENGTH);
};

export const detectStatueCell = (
  answer: string = "",
  letter: string,
  index: number
): LetterStatus => {
  if (!answer || !letter) return "none";
  else if (answer[index] === letter) return "hit";
  else if (answer.includes(letter)) return "match";
  else return "miss";
};

export const detectStatueKey = (
  answer: string = "",
  guesses: string[],
  letter: string
): LetterStatus => {
  const answerArray = answer.split("");
  const letterInAnswer = answerArray.includes(letter);
  const letterInGuess = guesses.some((word) => word.includes(letter));

  if (letterInAnswer && letterInGuess) {
    const answerIndices: number[] = [];
    const guessIndices: number[] = [];

    answerArray.forEach((char, index) => {
      if (char === letter) {
        answerIndices.push(index);
      }
    });

    guesses.forEach((word, wordIndex) => {
      word.split("").forEach((char, charIndex) => {
        if (char === letter) {
          guessIndices.push(charIndex);
        }
      });
    });

    // Check if any guess index matches any answer index
    if (answerIndices.some((index) => guessIndices.includes(index))) {
      return "hit";
    } else {
      return "match";
    }
  } else if (letterInGuess) {
    return "miss";
  } else {
    return "none";
  }
};
