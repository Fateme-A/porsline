import { LetterStatus } from "@/app/models/models";
import { getLetterColor } from "@/app/utiles/utiles";

interface CellProps {
  tag: string;
  status: LetterStatus;
  customClass?: string;
}

function Cell({ tag, status, customClass }: CellProps) {
  return (
    <span
      className={`w-12 h-12 m-1 flex justify-center items-center${customClass} ${getLetterColor(
        status
      )}`}
    >
      {tag}
    </span>
  );
}

export default Cell;
