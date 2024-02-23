/** @format */

import { ctx, tileSize, deltaTime } from '../main.js';
import { waypoints } from './level.js';
import { takeDamage, setGold } from './player.js';
import { newAnimation } from './animation.js';

export class Enemy {
	constructor(health, damage, speed, goldValue, walkAnimationLeft, walkAnimationRight) {
		this.x = waypoints[0].x * tileSize;
		this.y = waypoints[0].y * tileSize;
		this.velocity = { x: 0, y: 0 };
		this.targetX = 0;
		this.targetY = 0;
		this.nextWaypoint = 0;
		this.facingDirection = "right";
		this.alive = true;
		this.health = health;
		this.damage = damage;
		this.speed = speed / tileSize;
		this.goldValue = goldValue;
		this.walkAnimationLeft = newAnimation(walkAnimationLeft);
		this.walkAnimationRight = newAnimation(walkAnimationRight);
		this.center = {
			x: this.x + tileSize / 2,
			y: this.y + tileSize / 2,
		};
		this.radius = 16;
		this.newTarget();
		enemies.push(this);
	}
	
	static spawnEnemy(name, healthMult) {
		const enemy = enemyData[name];
		new Enemy(enemy.health * healthMult, enemy.damage, enemy.speed, enemy.goldValue, enemy.walkAnimationLeft, enemy.walkAnimationRight);
	}

	update() {
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

		this.center = {
			x: this.x + this.velocity.x + 16,
			y: this.y + this.velocity.y + 16,
		};

		if (this.velocity.x > 0) {
			this.facingDirection = "right";
		}
		else if (this.velocity.x < 0) {
			this.facingDirection = "left";
		}

		this.render();
	}

	newTarget() {
		this.nextWaypoint++;

		if (this.nextWaypoint >= waypoints.length) {
			console.log('Enemy got through');
			takeDamage(this.damage);
			deleted.push(this);
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

		this.velocity.x = normalizedDirection.x * this.speed;
		this.velocity.y = normalizedDirection.y * this.speed;
	}

	takeDamage(amount) {
		if (!this.alive) {
			return;
		}
		this.health -= amount;
		if (this.health <= 0) {
			this.alive = false;
			setGold(this.goldValue);
			deleted.push(this);
		}
	}

	render() {
		if (this.facingDirection == "right") {
			this.walkAnimationRight.drawFrame(this.x, this.y);
		}
		else {
			this.walkAnimationLeft.drawFrame(this.x, this.y);
		}
	}
}

export const enemies = [];

const enemyData = {
	slime: { health: 10, damage: 1, speed: 1, goldValue: 5, walkAnimationLeft: "slimeWalk", walkAnimationRight: "slimeWalk" },
	skeleton: { health: 20, damage: 1, speed: 1.5, goldValue: 10, walkAnimationLeft: "skeletonLeft", walkAnimationRight: "skeletonRight" },
	goblin: { health: 5, damage: 1, speed: 2.2, goldValue: 2, walkAnimationLeft: "goblinLeft", walkAnimationRight: "goblinRight" },
	wisp: { health: 40, damage: 1, speed: 0.8, goldValue: 10, walkAnimationLeft: "wispLeft", walkAnimationRight: "wispRight" },
	death: { health: 350, damage: 10, speed: 1, goldValue: 100, walkAnimationLeft: "deathLeft", walkAnimationRight: "deathRight" },
}

const deleted = [];

export function updateEnemies() {
	enemies.forEach((enemy) => {
		enemy.update(deltaTime);
	});

	deleted.forEach((enemy) => {
		enemies.splice(enemies.indexOf(enemy), 1);
	});

	deleted.length = 0;
}
