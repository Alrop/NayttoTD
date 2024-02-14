/** @format */

import { ctx, tileSize, deltaTime } from '../main.js';
import { waypoints } from './level.js';
import { takeDamage } from './player.js';
import { newAnimation } from './animation.js';

export class Enemy {
	constructor(health, damage, speed, goldValue, walkAnimation) {
		this.x = waypoints[0].x * tileSize;
		this.y = waypoints[0].y * tileSize;
		this.velocity = { x: 0, y: 0 };
		this.targetX = 0;
		this.targetY = 0;
		this.nextWaypoint = 0;
		this.health = health;
		this.damage = damage;
		this.speed = speed;
		this.goldValue = goldValue;
		this.walkAnimation = walkAnimation;
		this.center = {
			x: this.x + tileSize / 2,
			y: this.y + tileSize / 2,
		};
		this.radius = 16;
		this.newTarget();
		enemies.push(this);
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

		this.center = {
			x: this.x + this.velocity.x + 16,
			y: this.y + this.velocity.y + 16,
		};

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
		health -= amount;
		if (health <= 0) {
			gold += this.goldValue;
			deleted.push(this);
		}
	}

	render() {
		this.walkAnimation.drawFrame(this.x, this.y);

		/* ctx.fillStyle = 'orange';
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		ctx.fill(); */
	}
}

export const enemies = [];

const deleted = [];

let timer = 0;
let nextSpawn = 0;
let enemySpawn;
let remainingSpawns = 0;

export function updateEnemies() {
	enemies.forEach((enemy) => {
		enemy.update(deltaTime);
	});

	deleted.forEach((enemy) => {
		enemies.splice(enemies.indexOf(enemy), 1);
	});

	deleted.length = 0;

	timer += deltaTime;

	if (timer > nextSpawn && remainingSpawns > 0) {
		timer -= nextSpawn;
		new Enemy(enemySpawn.health, enemySpawn.damage, enemySpawn.speed, enemySpawn.goldValue, newAnimation(enemySpawn.walkAnimation));
		remainingSpawns--;
	}
}

export function spawnWave(enemy, amount, delay) {
	timer = 0;
	nextSpawn = delay;
	enemySpawn = enemy;
	remainingSpawns = amount;
}
