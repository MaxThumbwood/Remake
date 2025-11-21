export class Grass {
    constructor(x, y) {
        this.view = new PIXI.Graphics();
        this.view.x = x;
        this.view.y = y;

        // Draw thicker, more visible grass
        this.view.poly([
            0, 0,    // Base
            -6, -20, // Tip Left
            0, -25,  // Tip Top
            6, -20   // Tip Right
        ]);
        this.view.fill(0x3ea34e); // Darker green for contrast

        this.offset = Math.random() * 100;
        // Increased speed for visibility
        this.swaySpeed = 0.1 + Math.random() * 0.1; 
    }

    update(time) {
        // Stronger sway (0.5 skew is very visible)
        this.view.skew.x = Math.sin(time * this.swaySpeed + this.offset) * 0.5;
    }
}

export class Flower {
    constructor(x, y) {
        this.view = new PIXI.Container();
        this.view.x = x;
        this.view.y = y;

        const g = new PIXI.Graphics();
        
        // Stem
        g.rect(-2, -15, 4, 15);
        g.fill(0x2d8a3e);

        // Petals (Brighter White)
        g.circle(0, -15, 8); 
        g.fill(0xffffff);
        g.stroke({ width: 1, color: 0xdddddd });

        // Center (Bright Red/Yellow for visibility)
        g.circle(0, -15, 3);
        const colors = [0xff0000, 0xffeb3b, 0xff00ff]; // Random petal colors
        g.fill(colors[Math.floor(Math.random() * colors.length)]);

        this.view.addChild(g);
        
        this.offset = Math.random() * 100;
    }

    update(time) {
        // Bobbing up and down
        this.view.y += Math.sin(time + this.offset) * 0.1;
        // Swaying left and right
        this.view.skew.x = Math.sin(time + this.offset) * 0.2;
    }
}