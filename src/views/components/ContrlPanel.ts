import { Container, Graphics, Text } from "pixi.js";

export class ControlPanelView extends Container {
  private balanceText!: Text;
  private betText!: Text;
  private spinButton: Graphics = new Graphics();
  private spinLabel!: Text;
  private onSpinCallback: () => void;
  private onDecreaseBetCallback: () => void;
  private onIncreaseBetCallback: () => void;
  private _disabled: boolean = false;

  constructor(
    onSpin: () => void,
    onDecreaseBet: () => void,
    onIncreaseBet: () => void,
  ) {
    super();
    this.onSpinCallback = onSpin;
    this.onDecreaseBetCallback = onDecreaseBet;
    this.onIncreaseBetCallback = onIncreaseBet;
    this.createUI();
  }

  private createUI() {
    this.balanceText = this.createLabel("1000", 50, 60, 0x00ff00);
    this.betText = this.createLabel("1", 330, 55, 0xffff00);

    const balanceLabel = new Text({
      text: "Balance",
      style: {
        fontFamily: "Arial",
        fontSize: 18,
        fill: 0xaaaaaa,
      },
    });
    balanceLabel.x = 50;
    balanceLabel.y = 40;
    this.addChild(balanceLabel);

    const betLabel = new Text({
      text: "Bet",
      style: {
        fontFamily: "Arial",
        fontSize: 18,
        fill: 0xaaaaaa,
      },
    });
    betLabel.x = 260;
    betLabel.y = 30;
    this.addChild(betLabel);

    const minusBtn = new Graphics();
    minusBtn.rect(0, 0, 30, 30).fill(0x555555);
    minusBtn.x = 260;
    minusBtn.y = 55;
    minusBtn.eventMode = "static";
    minusBtn.on("pointertap", () => this.onDecreaseBetCallback());
    this.addChild(minusBtn);

    const minusLabel = new Text({
      text: "-",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });
    minusLabel.anchor.set(0.5);
    minusLabel.x = 275;
    minusLabel.y = 70;
    this.addChild(minusLabel);

    const plusBtn = new Graphics();
    plusBtn.rect(0, 0, 30, 30).fill(0x888888);
    plusBtn.x = 380;
    plusBtn.y = 55;
    plusBtn.eventMode = "static";
    plusBtn.on("pointertap", () => this.onIncreaseBetCallback());
    this.addChild(plusBtn);

    const plusLabel = new Text({
      text: "+",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });
    plusLabel.anchor.set(0.5);
    plusLabel.x = 395;
    plusLabel.y = 70;
    this.addChild(plusLabel);

    this.spinButton = new Graphics();
    this.spinButton.rect(0, 0, 120, 50).fill(0xdc143c);
    this.spinButton.x = 550;
    this.spinButton.y = 55;
    this.spinButton.eventMode = "static";
    this.spinButton.on("pointertap", () => {
      if (!this._disabled) {
        this.onSpinCallback();
      }
    });
    this.addChild(this.spinButton);

    this.spinLabel = new Text({
      text: "SPIN",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });
    this.spinLabel.anchor.set(0.5);
    this.spinLabel.x = 610;
    this.spinLabel.y = 80;
    this.addChild(this.spinLabel);
  }

  private createLabel(text: string, x: number, y: number, color: number): Text {
    const label = new Text({
      text,
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: color,
        fontWeight: "bold",
      },
    });
    label.x = x;
    label.y = y;
    this.addChild(label);
    return label;
  }

  setBalance(value: number) {
    this.balanceText.text = String(Math.floor(value));
  }

  setBet(value: number) {
    this.betText.text = String(value);
  }

  setDisabled(value: boolean) {
    this._disabled = value;
    this.spinButton.alpha = value ? 0.5 : 1;
  }
}
