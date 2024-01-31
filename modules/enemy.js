import { ctx, tileSize } from "../main.js";
import { waypoints } from "./level.js";

export class Enemy {
    constructor(health, speed) {
        this.x = waypoints[0].x * tileSize;
        this.y = waypoints[0].y * tileSize;
        this.velocity = {x: 0, y: 0};
        this.targetX = 0;
        this.targetY = 0;
        this.nextWaypoint = 0;
        this.health = health;
        this.speed = speed;

        this.newTarget();
    }

    update(deltaTime) {
        const deltaX = this.targetX - this.x;
        const deltaY = this.targetY - this.y;
        const distanceToTarget = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const movX = this.velocity.x * deltaTime;
        const movY = this.velocity.y * deltaTime;

        if (distanceToTarget <= Math.abs(movX) + Math.abs(movY)) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.newTarget();
        } else {
            this.x += movX;
            this.y += movY;
        }

        this.render();
    }

    newTarget() {
        this.nextWaypoint++;

        if (this.nextWaypoint >= waypoints.length) {
            console.log("Enemy got through");
            return;
        }
        this.targetX = waypoints[this.nextWaypoint].x * tileSize;
        this.targetY = waypoints[this.nextWaypoint].y * tileSize;

        const deltaX = this.targetX - this.x;
        const deltaY = this.targetY - this.y;
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedDirection = {
            x: deltaX / magnitude,
            y: deltaY / magnitude,
        };

        this.velocity.x = normalizedDirection.x * this.speed
        this.velocity.y = normalizedDirection.y * this.speed
    }

    render() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 32, 32);
    }
}