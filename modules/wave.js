import { deltaTime } from "../main.js";
import { Enemy, enemies } from "./enemy.js";
import { gameOver } from "./player.js";

const waveDelay = 10000;
const healthScaling = 0.1;

export let totalWave = 0;
let currentWave = 0;
let waveTimer = waveDelay;
let spawnTimer = 0;
let nextSpawn = 0;
let enemySpawn;
let remainingSpawns = 0;

export const waveData = [
	{enemy: "slime", amount: 10, spawnDelay: 1000 },
    {enemy: "skeleton", amount: 10, spawnDelay: 1000 },
	{enemy: "goblin", amount: 25, spawnDelay: 400 },
	{enemy: "wisp", amount: 10, spawnDelay: 1500 },
	{enemy: "death", amount: 1, spawnDelay: 0 },
]

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
        Enemy.spawnEnemy(enemySpawn, 1 + healthScaling * totalWave);
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

export function resetWave() {
    totalWave = 0;
    currentWave = 0;
    waveTimer = waveDelay;
}

function spawnWave(enemy, amount, spawnDelay) {
    waveTimer = 0;
	spawnTimer = 0;
	nextSpawn = spawnDelay;
	enemySpawn = enemy;
	remainingSpawns = amount;
}
