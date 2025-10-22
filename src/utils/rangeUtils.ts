import { Rank, RangeCell } from '../types';

const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * 13x13のレンジ表データを生成
 * 行: A → 2（縦軸）
 * 列: A → 2（横軸）
 * 対角線: ペア（AA, KK, ...）
 * 右上: suited（AKs, AQs, ...）
 * 左下: offsuit（AKo, AQo, ...）
 */
export function generateRangeGrid(): RangeCell[][] {
  const grid: RangeCell[][] = [];

  for (let row = 0; row < 13; row++) {
    const rowData: RangeCell[] = [];
    for (let col = 0; col < 13; col++) {
      const rowRank = RANKS[row];
      const colRank = RANKS[col];

      if (row === col) {
        // 対角線: ペア
        rowData.push({
          display: `${rowRank}${colRank}`,
          suited: null,
          ranks: [rowRank, colRank],
        });
      } else if (col > row) {
        // 右上: suited
        rowData.push({
          display: `${colRank}${rowRank}s`,
          suited: true,
          ranks: [colRank, rowRank],
        });
      } else {
        // 左下: offsuit
        rowData.push({
          display: `${rowRank}${colRank}o`,
          suited: false,
          ranks: [rowRank, colRank],
        });
      }
    }
    grid.push(rowData);
  }

  return grid;
}

/**
 * セルが対角線上か判定
 */
export function isDiagonal(row: number, col: number): boolean {
  return row === col;
}

/**
 * セルが8行目または8列目か判定（0-indexed）
 * RANKS配列: ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', ...]
 * '8'はインデックス6
 */
export function isRow8OrCol8(row: number, col: number): boolean {
  return row === 6 || col === 6;
}
