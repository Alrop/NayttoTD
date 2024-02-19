import { ctx, deltaTime } from "../main.js";

export class Animation {
    constructor(file, frametime, height, width, frames) {
        this.sprite = new Image();
        this.sprite.src = file;
        this.frametime = frametime;
        this.height = height;
        this.width = width;
        this.frames = frames;
        this.currentFrame = 0;
        this.currentTime = 0;
    }

    drawFrame(x, y) {
        ctx.drawImage(this.sprite, this.width * this.currentFrame, 0, this.width, this.height, Math.round(x), Math.round(y), this.width, this.height);
        this.currentTime += deltaTime;
        if (this.currentTime > this.frametime) {
            this.currentTime -= this.frametime;
            this.currentFrame++;
            if (this.currentFrame >= this.frames) {
                this.currentFrame = 0;
            }
        }
    }
}

const animationData = {
    slimeWalk: {file: "../gfx/slime.png", frametime: 100, height: 32, width: 32, frames: 4},
    skeletonLeft: {file: "../gfx/skeleton_left.png", frametime: 120, height: 32, width: 32, frames: 6},
    skeletonRight: {file: "../gfx/skeleton_right.png", frametime: 120, height: 32, width: 32, frames: 6},
    goblinLeft: {file: "../gfx/goblin_left.png", frametime: 80, height: 32, width: 32, frames: 6},
    goblinRight: {file: "../gfx/goblin_right.png", frametime: 80, height: 32, width: 32, frames: 6},
};

export function newAnimation(animation) {
    const data = animationData[animation];
    return new Animation(data.file, data.frametime, data.height, data.width, data.frames);
}