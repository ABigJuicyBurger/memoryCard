import { ScoreBoardProps } from "../types/types";

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <h1>Current Score: {score}</h1>
      <h1>High Score: {highScore}</h1>
    </div>
  );
}
