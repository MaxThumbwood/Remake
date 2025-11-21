export class Camera {
    constructor(app, worldContainer) {
        this.app = app;
        this.world = worldContainer;
        this.target = null;
        this.lerpSpeed = 0.1; // Smoothness (0.1 = smooth, 1 = instant)
    }

    follow(target) {
        this.target = target;
    }

    update(delta) {
        if (!this.target) return;

        // Center of the screen
        const screenX = this.app.screen.width / 2;
        const screenY = this.app.screen.height / 2;

        // Determine where the world needs to be to put target in center
        // Target world position + World Offset = Screen Center
        // World Offset = Screen Center - Target World Position
        const goalX = screenX - this.target.x;
        const goalY = screenY - this.target.y;

        // Smoothly interpolate current world position to goal position
        // Using standard linear interpolation logic
        this.world.x += (goalX - this.world.x) * this.lerpSpeed;
        this.world.y += (goalY - this.world.y) * this.lerpSpeed;
    }
}