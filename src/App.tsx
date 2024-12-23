import { useState } from "react";
import { useEffect } from "react";
import shuffleCards from "./components/shuffleCards";
import DisplayCards from "./components/displayCards";
import ScoreBoard from "./components/scoreBoard";
import "./App.css";
import YuGiOhPhoto from "../src/assets/Yu-Gi-OhLogo.webp";

interface Card {
  name: string;
  image: string;
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Card[] | null>(null);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  // const [cards, setCards] = useState([]);

  // Function to fetch API for 12 random cards
  async function getYuGiOhCards() {
    setIsLoading(true);
    setError(null);
    try {
      const randomOffset = Math.floor(Math.random() * 11000);
      const response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=${randomOffset}&sort=random`
      );
      const fetchedData = await response.json();
      const simplifiedCards = fetchedData.data.map((card) => ({
        name: card.name,
        image: card.card_images[0].image_url_small,
      }));

      console.log(simplifiedCards);
      setData(simplifiedCards);
    } catch (error) {
      setError(error ? Error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const getNewYuGiOhCards = useEffect(() => {
    getYuGiOhCards();
  }, [gameOver]);

  function handleCardClick(cardName) {
    if (clickedCards.includes(cardName)) {
      // Game over
      setGameOver(true);
      setScore(0);
      setClickedCards([]);
    } else {
      // keep going
      const newClickedCards = [...clickedCards, cardName];
      setClickedCards(newClickedCards);

      // Win condition check
      if (newClickedCards.length === 12) {
        setWinGame(true);
        setGameOver(true);
        setHighScore(12);
        setScore(0);
        setClickedCards([]);
        return (
          <div>
            <h1>You won!</h1>
          </div>
        );
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
      ) : startGame ? (
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
