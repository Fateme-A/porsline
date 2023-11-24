import { LetterStatus } from "@/app/models/models";
import { getLetterColor } from "@/app/utiles/utiles";
import { MouseEventHandler, ReactNode } from "react";

interface KeyProps {
  tag: string;
  status: LetterStatus;
  onClick: (tag: string) => void;
  children?: ReactNode;
  isSpecialKey: boolean;
}
function Key({ children, tag, status, isSpecialKey, onClick }: KeyProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(tag);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 p-2 m-1 rounded text-white ${getLetterColor(
        status
      )} ${isSpecialKey ? "w-full" : "shrink-0"}`}
    >
      {children}
    </button>
  );
}

export default Key;
