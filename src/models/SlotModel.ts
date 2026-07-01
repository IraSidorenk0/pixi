import slotData from "../data/slotData.json";
import { SlotDataSchema } from "./types";

export class SlotModel {
  private data: SlotDataSchema;
  private currentSpinIndex: number = 0;
  public balance: number;

  constructor() {
    this.data = slotData as SlotDataSchema;
    this.balance = this.data.gameConfig.balance;
  }

  public get config() {
    return this.data.gameConfig;
  }

  public getNextSpin(currentBet: number) {
    const spin = this.data.spins[this.currentSpinIndex];
    this.balance -= currentBet;
    this.balance += spin.win.amount;
    this.currentSpinIndex =
      (this.currentSpinIndex + 1) % this.data.spins.length;
    return spin;
  }

  public getSymbolAt(matrix: string[][], col: number, row: number): string {
    return matrix[row][col];
  }
}
