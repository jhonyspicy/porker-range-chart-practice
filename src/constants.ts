// ゲーム設定の定数
export const GAME_CONFIG = {
  // 制限時間の設定（ミリ秒）
  INITIAL_TIME_LIMIT: 10000, // 初期制限時間: 10秒（デバッグ用に2倍）
  TIME_REDUCTION_RATE: 0.05, // 各正解後の短縮率: 5%
  MIN_TIME_LIMIT: 2000, // 下限値: 2秒（デバッグ用に2倍）

  // カウントダウン
  COUNTDOWN_SECONDS: 3, // スタート時のカウントダウン秒数
} as const;
