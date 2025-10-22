// カードの型定義
export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
  suit: Suit;
  rank: Rank;
}

// ゲームの状態
export type GameState = 'start' | 'countdown' | 'playing' | 'gameover';

// レンジ表のセル情報
export interface RangeCell {
  display: string; // 表示文字列（例: "AKs", "AKo", "AA"）
  suited: boolean | null; // suited (true), offsuit (false), pair (null)
  ranks: [Rank, Rank]; // 2つのランク
}
