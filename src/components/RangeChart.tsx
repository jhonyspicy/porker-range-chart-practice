import { useMemo } from 'react';
import { generateRangeGrid, isDiagonal, isRow8OrCol8 } from '../utils/rangeUtils';
import './RangeChart.css';

interface RangeChartProps {
  onCellClick: (cellKey: string) => void;
  disabled?: boolean;
  correctCellKey?: string | null; // デバッグ用: 正解のセルキー
}

export function RangeChart({ onCellClick, disabled = false, correctCellKey = null }: RangeChartProps) {
  const grid = useMemo(() => generateRangeGrid(), []);

  return (
    <div className="range-chart">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="range-row">
          {row.map((cell, colIndex) => {
            const isCorrect = correctCellKey === cell.display;
            const cellClassName = [
              'range-cell',
              isDiagonal(rowIndex, colIndex) ? 'diagonal' : '',
              isRow8OrCol8(rowIndex, colIndex) ? 'row8-col8' : '',
              isCorrect ? 'correct-answer' : '', // デバッグ用
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={colIndex}
                className={cellClassName}
                onClick={() => !disabled && onCellClick(cell.display)}
                disabled={disabled}
              >
                {cell.display}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
