"use client";
import { keypadKeys } from "@/app/constants/constants";
import Key from "./key";
import { detectStatueKey, isSpecialKey } from "@/app/utiles/utiles";

interface KeypadProps {
  onKeyClick: (key: string) => void;
  answer: string;
  guesses: string[];
}

function Keypad({ onKeyClick, answer, guesses }: KeypadProps) {
  return (
    <div>
      {keypadKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((key) => (
            <Key
              key={"keypad-" + key}
              onClick={() => onKeyClick(key)}
              tag={key}
              status={detectStatueKey(answer, guesses, key)}
              isSpecialKey={isSpecialKey(key)}
            >
              {key === "Enter" ? (
                <span>&#8629;</span>
              ) : key === "Backspace" ? (
                <span>&#9003;</span>
              ) : (
                key
              )}
            </Key>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keypad;
