export class Structure {
    constructor(x, y, width, height) {
        this.view = new PIXI.Container();
        this.view.x = x;
        this.view.y = y;

        // Define colors for "Fake Lighting"
        const cTop = 0xeeeeee;   // Brightest (Sun hits top)
        const cFront = 0x999999; // Medium (Front face)
        const cSide = 0x777777;  // Darkest (Side face shadow)

        // Depth of the 3D effect
        const depth = 20; 

        // 1. Draw Shadow (Base)
        const shadow = new PIXI.Graphics();
        shadow.ellipse(0, 0, width/2 + 10, 15);
        shadow.fill({ color: 0x000000, alpha: 0.3 });
        this.view.addChild(shadow);

        // 2. Draw Body
        this.body = new PIXI.Graphics();

        // A. Side Face (Darker, angled to look 3D)
        this.body.poly([
            width/2, 0,                  // Bottom Right Front
            width/2 + depth, -depth,     // Bottom Right Back
            width/2 + depth, -height - depth, // Top Right Back
            width/2, -height             // Top Right Front
        ]);
        this.body.fill(cSide);

        // B. Front Face
        this.body.rect(-width/2, -height, width, height);
        this.body.fill(cFront);

        // C. Top Face (Roof)
        this.body.poly([
            -width/2, -height,              // Front Left
            width/2, -height,               // Front Right
            width/2 + depth, -height - depth, // Back Right
            -width/2 + depth, -height - depth // Back Left
        ]);
        this.body.fill(cTop);
        
        // Add borders for crisp look
        this.body.stroke({ width: 2, color: 0x444444 });

        this.view.addChild(this.body);

        // Collision Setup
        this.baseWidth = width;
        this.baseHeight = 40; 
        this.alphaTarget = 1.0;
    }

    update(player) {
        // Transparency Logic
        const p = player.view;
        // Check if player is "behind" (higher Y is effectively behind in 2D top-down)
        // AND player is horizontally overlapping the building
        if (p.y < this.view.y && Math.abs(p.x - this.view.x) < this.baseWidth/2 + 15) {
            this.alphaTarget = 0.5;
        } else {
            this.alphaTarget = 1.0;
        }
        this.view.alpha += (this.alphaTarget - this.view.alpha) * 0.1;
    }

    checkCollision(x, y, radius) {
        const halfW = this.baseWidth / 2;
        // Simple box collision
        if (x > this.view.x - halfW - radius &&
            x < this.view.x + halfW + radius &&
            y > this.view.y - 20 - radius && // Top of footprint
            y < this.view.y + 10 + radius) { // Bottom of footprint
            return true;
        }
        return false;
    }
}