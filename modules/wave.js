import { deltaTime } from "../main.js";
import { Enemy, enemies, enemyData } from "./enemy.js";

const waveData = [
    {enemy: enemyData["slime"], amount: 10, spawnDelay: 1000 },
    {enemy: enemyData["skeleton"], amount: 10, spawnDelay: 1000 },
]

const waveDelay = 10000;

let currentWave = 0;
let waveTimer = waveDelay;
let spawnTimer = 0;
let nextSpawn = 0;
let enemySpawn;
let remainingSpawns = 0;

export function updateWave() {
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
        currentWave++;

        if (currentWave >= waveData.length) {
            currentWave = 0;
        }
	}
}

export function spawnWave(enemy, amount, spawnDelay) {
    waveTimer = 0;
	spawnTimer = 0;
	nextSpawn = spawnDelay;
	enemySpawn = enemy;
	remainingSpawns = amount;
}
