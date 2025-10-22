import './ProgressBar.css';

interface ProgressBarProps {
  percentage: number; // 0-100
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ height: `${percentage}%` }} />
    </div>
  );
}
