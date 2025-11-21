export class Joystick {
    constructor(app) {
        this.app = app;
        // Use global PIXI object
        this.container = new PIXI.Container();
        
        this.radius = 50;
        this.handleRadius = 20;
        this.maxDist = 40;
        
        this.active = false;
        this.data = null;
        this.x = 0;
        this.y = 0;
        this.origin = { x: 0, y: 0 };

        this.base = new PIXI.Graphics();
        this.handle = new PIXI.Graphics();

        this.draw();

        this.container.addChild(this.base);
        this.container.addChild(this.handle);

        this.container.x = 100;
        this.container.y = window.innerHeight - 100;

        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        
        this.app.stage.on('pointerdown', this.onDown.bind(this));
        this.app.stage.on('pointermove', this.onMove.bind(this));
        this.app.stage.on('pointerup', this.onUp.bind(this));
        this.app.stage.on('pointerupoutside', this.onUp.bind(this));
    }

    draw() {
        this.base.circle(0, 0, this.radius);
        this.base.fill({ color: 0xffffff, alpha: 0.2 });
        this.base.stroke({ width: 2, color: 0xffffff, alpha: 0.5 });

        this.handle.circle(0, 0, this.handleRadius);
        this.handle.fill({ color: 0xffffff, alpha: 0.8 });
    }

    onDown(e) {
        this.active = true;
        this.data = e;
        const pos = e.getLocalPosition(this.app.stage);
        this.origin = { x: pos.x, y: pos.y };
        this.handle.position.set(0, 0);
    }

    onMove(e) {
        if (!this.active) return;
        const pos = e.getLocalPosition(this.container);
        let dx = pos.x;
        let dy = pos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist > this.maxDist) {
            const angle = Math.atan2(dy, dx);
            dx = Math.cos(angle) * this.maxDist;
            dy = Math.sin(angle) * this.maxDist;
        }

        this.handle.position.set(dx, dy);
        this.x = dx / this.maxDist;
        this.y = dy / this.maxDist;
    }

    onUp() {
        this.active = false;
        this.data = null;
        this.handle.position.set(0, 0);
        this.x = 0;
        this.y = 0;
    }
}