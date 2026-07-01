import { Container, Text } from "pixi.js";

export class WinDisplayView extends Container {
  private text: Text;

  constructor() {
    super();
    this.text = new Text({
      text: "",
      style: {
        fontFamily: "Arial",
        fontSize: 30,
        fill: 0xffd700,
        fontWeight: "bold",
        align: "center",
      },
    });
    this.text.anchor.set(0.5);
    this.text.x = 400;
    this.text.y = 40;
    this.addChild(this.text);
  }

  showWin(amount: number) {
    this.text.text = `WIN: ${amount}`;
  }

  clear() {
    this.text.text = "";
  }
}
