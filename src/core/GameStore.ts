export class GameStore {
  private _balance: number;
  private _bet: number;
  private _win: number;
  private _isSpinning: boolean;
  private _matrix: string[][] = [];
  private _winningPositions: [number, number][] = [];
  private listeners: Set<() => void> = new Set();

  constructor(balance: number, bet: number) {
    this._balance = balance;
    this._bet = bet;
    this._win = 0;
    this._isSpinning = false;
  }

  get balance() {
    return this._balance;
  }
  get bet() {
    return this._bet;
  }
  get win() {
    return this._win;
  }
  get isSpinning() {
    return this._isSpinning;
  }
  get matrix() {
    return this._matrix;
  }
  get winningPositions() {
    return this._winningPositions;
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  startSpin() {
    this._isSpinning = true;
    this._win = 0;
    this._winningPositions = [];
    this.emit();
  }

  finishSpin(
    matrix: string[][],
    winAmount: number,
    positions: [number, number][],
    newBalance: number,
  ) {
    this._matrix = matrix;
    this._win = winAmount;
    this._winningPositions = positions;
    this._balance = newBalance;
    this._isSpinning = false;
    this.emit();
  }

  setBet(amount: number) {
    this._bet = amount;
    this.emit();
  }
}
