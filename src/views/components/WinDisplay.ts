import { Container, Graphics, Text } from "pixi.js";

export class WinDisplayView extends Container {
  private bg: Graphics;
  private text: Text;

  constructor() {
    super();

    this.bg = new Graphics();
    this.bg.roundRect(0, 0, 200, 50, 25).fill(0x222222);
    this.bg.roundRect(0, 0, 200, 50, 25).stroke({ width: 2, color: 0xffd700 });
    this.bg.x = 300;
    this.bg.y = 20;
    this.addChild(this.bg);

    this.text = new Text({
      text: "",
      style: {
        fontFamily: "Arial",
        fontSize: 28,
        fill: 0xffd700,
        fontWeight: "bold",
        align: "center",
      },
    });
    this.text.anchor.set(0.5);
    this.text.x = 400;
    this.text.y = 45;
    this.addChild(this.text);
  }

  showWin(amount: number) {
    this.text.text = `WIN: ${amount}`;
  }

  clear() {
    this.text.text = "";
  }
}
