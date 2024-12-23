import { DisplayCardsProps } from "../types/types";

export default function DisplayCards({ data, onClick }: DisplayCardsProps) {
  return (
    <div>
      <div className="card-grid">
        {data.map((card) => (
          <div key={card.name} className="card">
            <img
              src={card.image}
              alt={card.name}
              onClick={() => onClick(card.name)}
            />
            {/* <p>{card.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
