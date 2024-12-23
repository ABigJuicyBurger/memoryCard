import { useState } from "react";
import { useEffect } from "react";
import shuffleCards from "./components/shuffleCards";
import DisplayCards from "./components/displayCards";
import ScoreBoard from "./components/scoreBoard";
import "./App.css";
import YuGiOhPhoto from "../src/assets/Yu-Gi-OhLogo.webp";
import React from "react";
import { Card } from "./types/types";

declare module "*.webp" {
  const value: string;
  export default value;
}
interface YuGiOhApiResponse {
  data: {
    name: string;
    card_images: {
      image_url_small: string;
    }[];
  }[];
}

function App() {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winGame, setWinGame] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Card[] | null>(null);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  // const [cards, setCards] = useState([]);

  // Function to fetch API for 12 random cards
  async function getYuGiOhCards(): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const randomOffset: number = Math.floor(Math.random() * 11000);
      const response: Response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=${randomOffset}&sort=random`
      );
      const fetchedData: YuGiOhApiResponse = await response.json();
      const simplifiedCards = fetchedData.data.map((card) => ({
        name: card.name,
        image: card.card_images[0].image_url_small,
      }));

      console.log(simplifiedCards);
      setData(simplifiedCards);
    } catch (error) {
      setError(error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  const getNewYuGiOhCards = useEffect(() => {
    getYuGiOhCards();
  }, [gameOver]);

  function handleCardClick(cardName: string): JSX.Element | void {
    if (clickedCards.includes(cardName)) {
      // Game over
      setGameOver(true);
      setScore(0);
      setClickedCards([]);
    } else {
      // keep going
      const newClickedCards: string[] = [...clickedCards, cardName];
      setClickedCards(newClickedCards);

      // Win condition check
      if (newClickedCards.length === 12) {
        setWinGame(true);
        setGameOver(true);
        setHighScore(12);
        setScore(0);
        setClickedCards([]);
      }

      setScore(score + 1);

      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      shuffleCards(setData, data, setStartGame);
    }
  }

  return (
    <>
      {gameOver ? (
        <div>
          <h1>{winGame ? "You Won!" : "You Lost!"}</h1>
          <button
            onClick={() => {
              setWinGame(false);
              setGameOver(false);
              setStartGame(false);
              setClickedCards([]);
            }}
          >
            Play Again{" "}
          </button>
        </div>
      ) : startGame && data ? (
        <>
          <DisplayCards onClick={handleCardClick} data={data} />
          <ScoreBoard score={score} highScore={highScore} />
        </>
      ) : (
        <>
          <div className="title">
            <img src={YuGiOhPhoto} alt="Yu-Gi-Oh Logo"></img>
            <button onClick={() => shuffleCards(setData, data, setStartGame)}>
              Start game
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
