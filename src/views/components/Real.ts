import { Container, Graphics } from "pixi.js";
import { SymbolView } from "./Symbol";

const CELL_W = 80;
const CELL_H = 80;
const GAP = 10;

export class RealView extends Container {
  private symbols: SymbolView[][] = [];

  constructor(rows: number, cols: number) {
    super();

    const bg = new Graphics();
    bg.rect(
      0,
      0,
      cols * (CELL_W + GAP) - GAP,
      rows * (CELL_H + GAP) - GAP,
    ).fill(0x16213e);
    bg.rect(
      0,
      0,
      cols * (CELL_W + GAP) - GAP,
      rows * (CELL_H + GAP) - GAP,
    ).stroke({ width: 4, color: 0x4cc9f0 });
    this.addChild(bg);

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

  async spin(columns: number) {
    const promises: Promise<void>[] = [];
    for (let col = 0; col < columns; col++) {
      promises.push(this.spinColumn(col, col * 100));
    }
    return Promise.all(promises);
  }

  private spinColumn(col: number, delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const symbols = ["A", "B", "C", "D", "WILD", "SCATTER"];
        let frameCount = 0;
        const maxFrames = 10 + Math.floor(Math.random() * 5);

        const interval = setInterval(() => {
          frameCount++;
          for (let row = 0; row < this.symbols.length; row++) {
            const randomSymbol =
              symbols[Math.floor(Math.random() * symbols.length)];
            this.symbols[row][col].symbolId = randomSymbol;
          }

          if (frameCount >= maxFrames) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      }, delay);
    });
  }
}
