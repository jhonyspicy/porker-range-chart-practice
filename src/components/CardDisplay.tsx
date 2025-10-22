import { Card } from '../types';
import './CardDisplay.css';

interface CardDisplayProps {
  cards: [Card, Card] | null;
}

export function CardDisplay({ cards }: CardDisplayProps) {
  if (!cards) {
    return (
      <div className="card-display">
        <div className="card-placeholder"></div>
        <div className="card-placeholder"></div>
      </div>
    );
  }

  return (
    <div className="card-display">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`playing-card ${
            card.suit === '♥' || card.suit === '♦' ? 'red' : 'black'
          }`}
        >
          <div className="card-rank">{card.rank}</div>
          <div className="card-suit">{card.suit}</div>
        </div>
      ))}
    </div>
  );
}
