import { Container } from "pixi.js";
import { SlotModel } from "../models/SlotModel";
import { GameStore } from "../core/GameStore";
import { RealView } from "./components/Real";
import { ControlPanelView } from "./components/ContrlPanel";
import { WinDisplayView } from "./components/WinDisplay";

export class GameScene extends Container {
  private model: SlotModel;
  private store: GameStore;
  private reels: RealView;
  private controlPanel: ControlPanelView;
  private winDisplay: WinDisplayView;

  constructor() {
    super();
    this.model = new SlotModel();
    this.store = new GameStore(
      this.model.config.balance,
      this.model.config.bet,
    );

    this.reels = new RealView(
      this.model.config.rows,
      this.model.config.columns,
    );
    this.reels.x = 180;
    this.reels.y = 120;
    this.addChild(this.reels);

    this.winDisplay = new WinDisplayView();
    this.addChild(this.winDisplay);

    this.controlPanel = new ControlPanelView(
      () => this.onSpin(),
      () => this.onDecreaseBet(),
      () => this.onIncreaseBet(),
    );
    this.controlPanel.y = 430;
    this.addChild(this.controlPanel);

    this.store.subscribe(() => this.render());
    this.render();
  }

  private onSpin() {
    if (this.store.isSpinning) return;

    this.store.startSpin();

    const spinResult = this.model.getNextSpin(this.store.bet);
    const positions: [number, number][] = [];

    if (spinResult.win.lines) {
      for (const line of spinResult.win.lines) {
        positions.push(...line.positions);
      }
    }

    setTimeout(() => {
      this.store.finishSpin(
        spinResult.matrix,
        spinResult.win.amount,
        positions,
        this.model.balance,
      );
    }, 400);
  }

  private onDecreaseBet() {
    if (this.store.isSpinning) return;
    const newBet = Math.max(1, this.store.bet - 1);
    this.store.setBet(newBet);
  }

  private onIncreaseBet() {
    if (this.store.isSpinning) return;
    const newBet = this.store.bet + 1;
    this.store.setBet(newBet);
  }

  private render() {
    this.reels.setMatrix(this.store.matrix);
    this.reels.highlightPositions(this.store.winningPositions);
    this.controlPanel.setBalance(this.store.balance);
    this.controlPanel.setBet(this.store.bet);
    this.controlPanel.setDisabled(this.store.isSpinning);

    if (this.store.win > 0) {
      this.winDisplay.showWin(Math.floor(this.store.win));
    } else {
      this.winDisplay.clear();
    }
  }
}
