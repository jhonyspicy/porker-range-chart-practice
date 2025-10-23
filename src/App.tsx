import { useState, useEffect, useRef } from 'react';
import { CardDisplay } from './components/CardDisplay';
import { RangeChart } from './components/RangeChart';
import { ProgressBar } from './components/ProgressBar';
import {
  Modal,
  StartModal,
  CountdownModal,
  GameOverModal,
} from './components/Modal';
import { drawTwoCards, getCorrectCellKey } from './utils/cardUtils';
import { Card, GameState } from './types';
import { GAME_CONFIG } from './constants';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentCards, setCurrentCards] = useState<[Card, Card] | null>(null);
  const [score, setScore] = useState(0);
  const [countdownNumber, setCountdownNumber] = useState<number>(
    GAME_CONFIG.COUNTDOWN_SECONDS
  );
  const [timeLimit, setTimeLimit] = useState<number>(GAME_CONFIG.INITIAL_TIME_LIMIT);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    GAME_CONFIG.INITIAL_TIME_LIMIT
  );

  const timerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);

  // カウントダウン処理
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdownNumber > 0) {
        countdownTimerRef.current = window.setTimeout(() => {
          setCountdownNumber((prev) => prev - 1);
        }, 1000);
      } else {
        // カウントダウン終了 -> ゲーム開始
        setGameState('playing');
        startNewRound();
      }
    }

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [gameState, countdownNumber]);

  // ゲーム中のタイマー処理
  useEffect(() => {
    if (gameState === 'playing') {
      const startTime = Date.now();
      const endTime = startTime + timeRemaining;

      const updateTimer = () => {
        const now = Date.now();
        const remaining = endTime - now;

        if (remaining <= 0) {
          // 時間切れ
          setTimeRemaining(0);
          handleGameOver();
        } else {
          setTimeRemaining(remaining);
          timerRef.current = requestAnimationFrame(updateTimer);
        }
      };

      timerRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [gameState, currentCards]); // currentCardsが変わったらタイマーリセット

  // 新しいラウンドを開始
  const startNewRound = () => {
    const cards = drawTwoCards();
    setCurrentCards(cards);
    setTimeRemaining(timeLimit);
  };

  // スタートボタン押下時
  const handleStart = () => {
    setGameState('countdown');
    setScore(0);
    setTimeLimit(GAME_CONFIG.INITIAL_TIME_LIMIT);
    setCountdownNumber(GAME_CONFIG.COUNTDOWN_SECONDS);
  };

  // セルクリック時
  const handleCellClick = (cellKey: string) => {
    if (gameState !== 'playing' || !currentCards) return;

    const correctKey = getCorrectCellKey(currentCards[0], currentCards[1]);

    if (cellKey === correctKey) {
      // 正解
      const newScore = score + 1;
      setScore(newScore);

      // 制限時間を短縮（下限チェック）
      const newTimeLimit = Math.max(
        timeLimit * (1 - GAME_CONFIG.TIME_REDUCTION_RATE),
        GAME_CONFIG.MIN_TIME_LIMIT
      );
      setTimeLimit(newTimeLimit);

      // 次のラウンドへ
      startNewRound();
    } else {
      // 不正解 -> ゲームオーバー
      handleGameOver();
    }
  };

  // ゲームオーバー処理
  const handleGameOver = () => {
    setGameState('gameover');
    setCurrentCards(null);
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
    }
  };

  // プログレスバーの割合を計算
  const progressPercentage =
    gameState === 'playing' ? (timeRemaining / timeLimit) * 100 : 100;

  return (
    <div className="app">
      {/* 上部: プログレスバー */}
      <div className="progress-area">
        <ProgressBar percentage={progressPercentage} />
      </div>

      {/* メインコンテンツ */}
      <div className="main-content">
        {/* 左エリア: カード表示 */}
        <div className="card-area">
          <CardDisplay cards={currentCards} />
        </div>

        {/* 右エリア: レンジ表 */}
        <div className="chart-area">
          <RangeChart
            onCellClick={handleCellClick}
            disabled={gameState !== 'playing'}
          />
        </div>
      </div>

      {/* モーダル */}
      <Modal isOpen={gameState === 'start'}>
        <StartModal onStart={handleStart} />
      </Modal>

      <Modal isOpen={gameState === 'countdown'}>
        <CountdownModal count={countdownNumber} />
      </Modal>

      <Modal isOpen={gameState === 'gameover'}>
        <GameOverModal score={score} onRestart={handleStart} />
      </Modal>
    </div>
  );
}

export default App;
