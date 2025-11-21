import { Joystick } from './core/input.js';
import { Player } from './entities/player.js';
import { Camera } from './core/camera.js';
// Updated paths to match your 'world' folder
import { Structure } from './world/structure.js';
import { Grass, Flower } from './world/environment.js'; 

(async () => {
    // 1. Initialize Pixi App
    const app = new PIXI.Application();
    await app.init({ 
        resizeTo: window, 
        backgroundColor: 0x111111, 
        antialias: true 
    });
    document.getElementById('app').appendChild(app.canvas);

    // --- Layers ---
    const worldContainer = new PIXI.Container();
    const uiContainer = new PIXI.Container();
    
    // Enable Z-Sorting (Elements lower on screen sit on top of elements higher up)
    worldContainer.sortableChildren = true; 

    app.stage.addChild(worldContainer);
    app.stage.addChild(uiContainer);

    // --- 2. Green Ground ---
    const ground = new PIXI.Graphics();
    ground.rect(0, 0, 2000, 2000);
    ground.fill(0x4ec05b); // Nice grassy green
    worldContainer.addChild(ground); // Ground is static (no sort needed)
    
    // Create a specific container for things that need sorting (Players, Buildings, Nature)
    const sortGroup = new PIXI.Container();
    worldContainer.addChild(sortGroup);

    // --- 3. Add Nature (Grass & Flowers) ---
    const nature = [];

    // Add 300 Grass blades
    for(let i=0; i<300; i++) {
        const g = new Grass(Math.random() * 2000, Math.random() * 2000);
        nature.push(g);
        sortGroup.addChild(g.view);
    }

    // Add 50 Flowers (This was missing in your snippet!)
    for(let i=0; i<50; i++) {
        const f = new Flower(Math.random() * 2000, Math.random() * 2000);
        nature.push(f);
        sortGroup.addChild(f.view);
    }

    // --- 4. Add Structures (Buildings) ---
    const buildings = [];
    // Spawn 8 random buildings
    for(let i=0; i<8; i++) {
        const b = new Structure(
            200 + Math.random() * 1500, 
            200 + Math.random() * 1500, 
            100, // Width
            150  // Height
        );
        buildings.push(b);
        sortGroup.addChild(b.view);
    }

    // --- 5. Player & Core ---
    const joystick = new Joystick(app);
    uiContainer.addChild(joystick.container);

    const player = new Player(1000, 1000);
    sortGroup.addChild(player.view); // Player must be in sortGroup to appear behind/in-front of buildings

    const camera = new Camera(app, worldContainer);
    camera.follow(player.view);

    // --- 6. Game Loop ---
    let time = 0;
    app.ticker.add((ticker) => {
        const delta = ticker.deltaTime;
        time += 0.05 * delta;

        // A. Update Player (Pass buildings for collision!)
        player.update(delta, joystick, buildings);

        // B. Update Camera
        camera.update(delta);

        // C. Update Environment (Wind) & Buildings (Transparency)
        nature.forEach(n => n.update(time));
        buildings.forEach(b => b.update(player));

        // D. Z-SORTING
        // This sorts sprites by their Y position every frame
        sortGroup.children.sort((a, b) => a.y - b.y);
    });

})();