import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // const [cards, setCards] = useState([]);

  async function getYuGiOhCards() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=0&sort=random"
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

  useEffect(() => {
    getYuGiOhCards();
  }, []);

  // return (

  // )
}

export default App;
