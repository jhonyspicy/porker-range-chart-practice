import { useMemo } from 'react';
import { generateRangeGrid, isDiagonal, isRow8OrCol8 } from '../utils/rangeUtils';
import './RangeChart.css';

interface RangeChartProps {
  onCellClick: (cellKey: string) => void;
  disabled?: boolean;
  showCardLabels?: boolean;
}

export function RangeChart({ onCellClick, disabled = false, showCardLabels = true }: RangeChartProps) {
  const grid = useMemo(() => generateRangeGrid(), []);

  return (
    <div className="range-chart">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="range-row">
          {row.map((cell, colIndex) => {
            const cellClassName = [
              'range-cell',
              isDiagonal(rowIndex, colIndex) ? 'diagonal' : '',
              isRow8OrCol8(rowIndex, colIndex) ? 'row8-col8' : '',
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
                {showCardLabels ? cell.display : ''}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
