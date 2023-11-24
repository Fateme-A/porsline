"use client";
import Keypad from "./components/keypad/keypad";
import { useState, useEffect, use } from "react";
import WordList from "./components/words/wordList";
import { POSSIBLE_WORD_COUNT, WORD_LENGTH } from "./constants/constants";
import { findCurrentGuessIndex } from "./utiles/utiles";
import { GameStatus } from "./models/models";
import Modal from "./components/modals/modal";

export default function Home() {
  const [answer, setAnswer] = useState("apple");
  const [statusGame, setStatusGame] = useState<GameStatus>("playing");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>(
    Array(POSSIBLE_WORD_COUNT).fill("")
  );

  useEffect(() => {
    // in this place can fetch words from the server
    statusGame === "playing" && setAnswer("apple");
  }, [statusGame]);

  const handleKeydown = (key: string) => {
    if (key === "Backspace") {
      // Handle Backspace key separately to remove the last letter
      setCurrentGuess((prevGuess) => {
        return prevGuess.length > 0 ? prevGuess.slice(0, -1) : prevGuess;
      });
    } else if (key === "Enter") {
      const currentIndex = findCurrentGuessIndex(guesses);

      // Handle when user wins the game
      if (answer.toLowerCase() === currentGuess.toLowerCase()) {
        setStatusGame("win");
      }

      // Handle when user lose the game
      if (
        answer.toLowerCase() !== currentGuess.toLowerCase() &&
        currentIndex === POSSIBLE_WORD_COUNT - 1
      ) {
        setStatusGame("lose");
      }

      // Handle Enter key separately to submit the guess
      setGuesses((prev) => {
        const newGuesses = [...prev];
        if (currentGuess.length === WORD_LENGTH)
          newGuesses[currentIndex] = currentGuess;
        return newGuesses;
      });
      setCurrentGuess((prev) => (prev.length === WORD_LENGTH ? "" : prev));
    } else {
      // Add the pressed key to the current guess
      setCurrentGuess((prevGuess) => {
        return prevGuess.length < WORD_LENGTH ? prevGuess + key : prevGuess;
      });
    }
  };

  const resetGame = () => {
    setStatusGame("playing");
    setGuesses(Array(POSSIBLE_WORD_COUNT).fill(""));
    setCurrentGuess("");
  };

  const renderModalContext = (state: GameStatus) => {
    switch (state) {
      case "win":
        return (
          <div className="m-12">
            <h2 className="mb-6 text-base">You are the champion!</h2>
            <p>Victory achieved!</p>
          </div>
        );

      case "lose":
        return (
          <div className="m-12">
            <h2 className="mb-6 text-base">
              It&apos;s okay, you&apos;ll get them next time.
            </h2>
            <p>You lose this round.</p>
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {!!answer && (
        <>
          {statusGame !== "playing" && (
            <Modal onClose={resetGame} className="items-center">
              <div className="text-p-200 text-sm text-center my-6">
                {renderModalContext(statusGame)}
              </div>
            </Modal>
          )}
          <WordList
            guesses={guesses}
            currentGuess={currentGuess}
            answer={answer}
          />
          <Keypad
            onKeyClick={handleKeydown}
            guesses={guesses}
            answer={answer}
          />
        </>
      )}
    </main>
  );
}
