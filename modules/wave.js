import { deltaTime } from "../main.js";
import { Enemy, enemies, waveData } from "./enemy.js";
import { gameOver } from "./player.js";

const waveDelay = 10000;

export let totalWave = 0;
let currentWave = 0;
let waveTimer = waveDelay;
let spawnTimer = 0;
let nextSpawn = 0;
let enemySpawn;
let remainingSpawns = 0;

export function updateWave() {
    if (gameOver) {
        return;
    }

    waveTimer += deltaTime;

    if (waveTimer < waveDelay) {
        return;
    }

    spawnTimer += deltaTime;

	if (spawnTimer > nextSpawn && remainingSpawns > 0) {
		spawnTimer -= nextSpawn;
		new Enemy(enemySpawn.health, enemySpawn.damage, enemySpawn.speed, enemySpawn.goldValue, enemySpawn.walkAnimationLeft, enemySpawn.walkAnimationRight);
		remainingSpawns--;
	}

	if (enemies.length == 0 && remainingSpawns == 0) {
        const wave = waveData[currentWave];
        spawnWave(wave.enemy, wave.amount, wave.spawnDelay);
        totalWave++;
        currentWave++;

        if (currentWave >= waveData.length) {
            currentWave = 0;
        }
	}
}

function spawnWave(enemy, amount, spawnDelay) {
    waveTimer = 0;
	spawnTimer = 0;
	nextSpawn = spawnDelay;
	enemySpawn = enemy;
	remainingSpawns = amount;
}
