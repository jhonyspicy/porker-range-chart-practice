import { Card, Suit, Rank } from '../types';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * 52枚のフルデッキを生成
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

/**
 * 配列をシャッフルする（Fisher-Yates アルゴリズム）
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * デッキから2枚のカードをランダムに抽選（同じカードは出ない）
 */
export function drawTwoCards(): [Card, Card] {
  const deck = createDeck();
  const shuffled = shuffle(deck);
  return [shuffled[0], shuffled[1]];
}

/**
 * 2枚のカードがsuitedかどうかを判定
 */
export function isSuited(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit;
}

/**
 * 2枚のカードがペアかどうかを判定
 */
export function isPair(card1: Card, card2: Card): boolean {
  return card1.rank === card2.rank;
}

/**
 * ランクの順序を取得（A=0, K=1, ..., 2=12）
 */
export function getRankIndex(rank: Rank): number {
  return RANKS.indexOf(rank);
}

/**
 * 2枚のカードから正解セルを特定
 * @returns セルの表示文字列（例: "AKs", "AKo", "AA"）
 */
export function getCorrectCellKey(card1: Card, card2: Card): string {
  if (isPair(card1, card2)) {
    return `${card1.rank}${card2.rank}`;
  }

  // ランクが異なる場合、順序を正規化（大きい方を先に）
  const [higherRank, lowerRank] =
    getRankIndex(card1.rank) < getRankIndex(card2.rank)
      ? [card1.rank, card2.rank]
      : [card2.rank, card1.rank];

  const suited = isSuited(card1, card2);
  return `${higherRank}${lowerRank}${suited ? 's' : 'o'}`;
}
