export interface GameConfig {
  rows: number;
  columns: number;
  bet: number;
  balance: number;
}

export interface SymbolConfig {
  id: string;
  type: "regular" | "wild" | "scatter";
  payout?: Record<string, number>;
}

export interface PaylineConfig {
  id: number;
  positions: [number, number][]; // [col, row]
}

export interface WinLine {
  payline: number;
  symbol: string;
  count: number;
  positions: [number, number][]; // [col, row]
}

export interface SpinWin {
  amount: number;
  lines?: WinLine[];
  scatterCount?: number;
  bonusTriggered?: boolean;
}

export interface SpinResult {
  id: number;
  matrix: string[][]; // [row][col]
  win: SpinWin;
}

export interface SlotDataSchema {
  gameConfig: GameConfig;
  symbols: SymbolConfig[];
  paylines: PaylineConfig[];
  spins: SpinResult[];
}
