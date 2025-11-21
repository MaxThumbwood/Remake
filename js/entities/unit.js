export class Unit {
  constructor(container, x = 0, y = 0) {
    this.container = container;
    this.x = x;
    this.y = y;

    // Basic sprite placeholder
    this.sprite = new PIXI.Graphics();
    this.sprite.beginFill(0xffffff);
    this.sprite.drawRect(-15, -15, 30, 30);
    this.sprite.endFill();
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.container.addChild(this.sprite);
  }

  update(delta) {
    // Placeholder for movement, AI, etc.
  }
}