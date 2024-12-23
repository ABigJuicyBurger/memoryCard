export default function shuffleCards(setData, data, setStartGame) {
  if (!data) return;

  setStartGame(true);

  const dataCopy = [...data];
  let currentIndex = dataCopy.length;

  // While there are elements to shuffle
  while (currentIndex != 0) {
    //Pick a remaining element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //And swap with current elmenet
    [dataCopy[currentIndex], dataCopy[randomIndex]] = [
      dataCopy[randomIndex],
      dataCopy[currentIndex],
    ];
  }

  setData(dataCopy);
  console.log(dataCopy);
}
