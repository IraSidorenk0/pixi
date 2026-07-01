import { Application } from "pixi.js";
import { GameScene } from "../views/GameScene";

export class GameApp {
  private app: Application;
  private scene: GameScene;

  constructor() {
    this.app = new Application();
    this.scene = new GameScene();
  }

  async init() {
    await this.app.init({
      background: "#1a1a2e",
      resizeTo: window,
    });

    document.getElementById("pixi-container")!.appendChild(this.app.canvas);
    this.app.stage.addChild(this.scene);
  }
}
