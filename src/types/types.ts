export interface Card {
  name: string;
  image: string;
}

export interface DisplayCardsProps {
  data: Card[];
  onClick: (cardName: string) => void;
}

export interface ScoreBoardProps {
  score: number;
  highScore: number;
}
