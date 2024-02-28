import { ctx, startGame } from "../main.js";
import { loadLevel } from "./level.js";

class LevelSelectButton {
    constructor(level, x, y, image) {
        this.level = level;
        this.position = { x: x, y: y };
        this.size = { x: 256, y: 225 };
        this.image = image;
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
        ctx.fillText("Level " + this.level, this.position.x + this.size.x / 2, this.position.y + 28);

        ctx.drawImage(this.image, this.position.x + 32, this.position.y + 40);
    }
}

const level1image = new Image();
level1image.src = './gfx/td_level1.png';
const level2image = new Image();
level2image.src = './gfx/td_level2.png';
const level3image = new Image();
level3image.src = './gfx/td_level3.png';

const level1Button = new LevelSelectButton(1, 50, 100, level1image);
const level2Button = new LevelSelectButton(2, 350, 100, level2image);
const level3Button = new LevelSelectButton(3, 650, 100, level3image);

export const levelSelectButtons = [
    level1Button,
    level2Button,
    level3Button
];

export function levelSelect() {
    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Tower Defense", 480, 50)

    levelSelectButtons.forEach(button => {
        button.draw();
    });
}