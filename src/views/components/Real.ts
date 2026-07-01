import { Container } from "pixi.js";
import { SymbolView } from "./Symbol";

const CELL_W = 100;
const CELL_H = 100;
const GAP = 10;

export class RealView extends Container {
  private symbols: SymbolView[][] = [];

  constructor(rows: number, cols: number) {
    super();

    for (let row = 0; row < rows; row++) {
      this.symbols[row] = [];
      for (let col = 0; col < cols; col++) {
        const symbol = new SymbolView("?");
        symbol.x = col * (CELL_W + GAP);
        symbol.y = row * (CELL_H + GAP);
        this.addChild(symbol);
        this.symbols[row][col] = symbol;
      }
    }
  }

  setMatrix(matrix: string[][]) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        this.symbols[row][col].symbolId = matrix[row][col];
      }
    }
  }

  highlightPositions(positions: [number, number][]) {
    for (let row = 0; row < this.symbols.length; row++) {
      for (let col = 0; col < this.symbols[row].length; col++) {
        const isWinning = positions.some(([c, r]) => c === col && r === row);
        this.symbols[row][col].highlighted = isWinning;
      }
    }
  }

  clearHighlights() {
    for (let row = 0; row < this.symbols.length; row++) {
      for (let col = 0; col < this.symbols[row].length; col++) {
        this.symbols[row][col].highlighted = false;
      }
    }
  }
}
