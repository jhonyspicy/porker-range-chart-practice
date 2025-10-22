import { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
}

interface StartModalProps {
  onStart: () => void;
}

export function StartModal({ onStart }: StartModalProps) {
  return (
    <div className="modal-inner">
      <h2>Poker Range Chart Practice</h2>
      <p>カードと表のセルを対応させよう!</p>
      <button className="modal-button" onClick={onStart}>
        スタート
      </button>
    </div>
  );
}

interface CountdownModalProps {
  count: number;
}

export function CountdownModal({ count }: CountdownModalProps) {
  return (
    <div className="modal-inner countdown">
      <div className="countdown-number">{count}</div>
    </div>
  );
}

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

export function GameOverModal({ score, onRestart }: GameOverModalProps) {
  return (
    <div className="modal-inner">
      <h2>Game Over</h2>
      <p className="score-display">正解数: {score}</p>
      <button className="modal-button" onClick={onRestart}>
        スタート
      </button>
    </div>
  );
}
