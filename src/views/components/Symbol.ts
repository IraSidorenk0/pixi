import { Container, Graphics, Text } from "pixi.js";

const COLORS: Record<string, number> = {
  A: 0xdc143c,
  B: 0x4169e1,
  C: 0x228b22,
  D: 0xffd700,
  WILD: 0x9932cc,
  SCATTER: 0xff8c00,
};

export class SymbolView extends Container {
  private bg: Graphics;
  private symbolLabel: Text;
  private _symbolId: string;
  private _highlighted: boolean = false;

  constructor(symbolId: string) {
    super();
    this._symbolId = symbolId;

    this.bg = new Graphics();
    this.addChild(this.bg);

    this.symbolLabel = new Text({
      text: symbolId,
      style: {
        fontFamily: "Open Sans",
        fontSize: 18,
        fill: 0xffffff,
        fontWeight: "bold",
        align: "center",
      },
    });
    this.symbolLabel.anchor.set(0.5);
    this.addChild(this.symbolLabel);

    this.draw(80, 80);
    this.symbolLabel.x = 40;
    this.symbolLabel.y = 40;
  }

  set symbolId(value: string) {
    this._symbolId = value;
    this.symbolLabel.text = value;
    const fontSize =
      value === "WILD" || value === "SCATTER" ? 14 : 18;
    this.symbolLabel.style.fontSize = fontSize;
    this.draw(80, 80);
  }

  get symbolId(): string {
    return this._symbolId;
  }

  set highlighted(value: boolean) {
    this._highlighted = value;
    this.draw(80, 80);
  }

  get highlighted(): boolean {
    return this._highlighted;
  }

  private draw(w: number, h: number) {
    const color = COLORS[this._symbolId] ?? 0x333333;
    this.bg.clear();
    this.bg.roundRect(0, 0, w, h, 8).fill({ color });
    this.bg.roundRect(0, 0, w, h, 8).stroke({ width: 2, color: 0xffffff });
    if (this._highlighted) {
      this.bg.roundRect(0, 0, w, h, 8).stroke({ width: 4, color: 0xffd700 });
    }
  }
}
