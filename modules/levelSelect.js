import { ctx, startGame } from "../main.js";
import { loadLevel } from "./level.js";

class LevelSelectButton {
    constructor(level, x, y) {
        this.level = level;
        this.position = { x: x, y: y };
        this.size = { x: 100, y: 64 };
    }

    clicked() {
        loadLevel("level" + this.level);
        startGame();
    }

    draw() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.position.x + 0.5, this.position.y + 0.5, this.size.x, this.size.y);

        ctx.fillStyle = 'white';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("Level " + this.level, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    }
}

const level1Button = new LevelSelectButton(1, 50, 80);
const level2Button = new LevelSelectButton(2, 175, 80);
const level3Button = new LevelSelectButton(3, 300, 80);

export const levelSelectButtons = [
    level1Button,
    level2Button,
    level3Button
];

export function levelSelect() {
    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Tower Defense", 480, 40)

    levelSelectButtons.forEach(button => {
        button.draw();
    });
}