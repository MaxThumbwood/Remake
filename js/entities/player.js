export class Player {
    constructor(x, y) {
        this.view = new PIXI.Container();
        this.view.x = x;
        this.view.y = y;

        this.radius = 16;
        this.graphics = new PIXI.Graphics();
        
        // Shadow
        this.graphics.ellipse(0, 10, 14, 6);
        this.graphics.fill({ color: 0x000000, alpha: 0.3 });
        
        // Body (centered slightly up)
        this.graphics.circle(0, -10, this.radius);
        this.graphics.fill(0x4ea8ff);
        this.graphics.stroke({ width: 2, color: 0xffffff });
        
        this.view.addChild(this.graphics);
        this.speed = 5;
        this.mapLimit = 2000;
    }

    update(delta, joystick, buildings = []) {
        if (!joystick.active) return;

        // Calculate potential movement
        const moveX = joystick.x * this.speed * delta;
        const moveY = joystick.y * this.speed * delta;

        // --- STEP 1: Try Moving X ---
        let nextX = this.view.x + moveX;
        
        // Clamp X
        if (nextX < this.radius) nextX = this.radius;
        if (nextX > this.mapLimit - this.radius) nextX = this.mapLimit - this.radius;

        // Check Collision X
        let collideX = false;
        for (const b of buildings) {
            if (b.checkCollision(nextX, this.view.y, this.radius)) {
                collideX = true;
                break;
            }
        }
        // Only apply X if no collision
        if (!collideX) {
            this.view.x = nextX;
        }

        // --- STEP 2: Try Moving Y ---
        let nextY = this.view.y + moveY;

        // Clamp Y
        if (nextY < this.radius) nextY = this.radius;
        if (nextY > this.mapLimit - this.radius) nextY = this.mapLimit - this.radius;

        // Check Collision Y
        let collideY = false;
        for (const b of buildings) {
            // Note: We use this.view.x (current valid X) combined with nextY
            if (b.checkCollision(this.view.x, nextY, this.radius)) {
                collideY = true;
                break;
            }
        }
        // Only apply Y if no collision
        if (!collideY) {
            this.view.y = nextY;
        }
    }
}