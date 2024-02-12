/** @format */

import { ctx, tileSize } from '../main.js';
import { TowerEmplacement } from '../towers.js';
import { placementTiles } from './utils.js';

// . = empty
// # = path
// T = tower spot

const level = [
	'...#....................',
	'...#....................',
	'...#....................',
	'...#...##############...',
	'...#...#............#...',
	'...#...#.........T..#...',
	'...#...#............#...',
	'...#...#.T..#########...',
	'...#...#....#...........',
	'...#...#....#...........',
	'...#...#....#...........',
	'...#####.T..#...........',
	'............#...########',
	'............#...#.......',
	'............#...#.......',
	'............#...#.......',
	'............#####.......',
	'........................',
	'........................',
	'........................',
];

export const waypoints = [
	{ x: 3, y: 0 },
	{ x: 3, y: 11 },
	{ x: 7, y: 11 },
	{ x: 7, y: 3 },
	{ x: 20, y: 3 },
	{ x: 20, y: 7 },
	{ x: 12, y: 7 },
	{ x: 12, y: 16 },
	{ x: 16, y: 16 },
	{ x: 16, y: 12 },
	{ x: 23, y: 12 },
];

export function renderLevel() {
	for (let y = 0; y < level.length; y++) {
		const row = level[y];
		for (let x = 0; x < row.length; x++) {
			const tile = row[x];
			if (tile == '#') {
				ctx.fillStyle = 'white';
				ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
			}
		}
	}
}

export function towerInit() {
	for (let y = 0; y < level.length; y++) {
		const row = level[y];
		for (let x = 0; x < row.length; x++) {
			const tile = row[x];
			switch (tile) {
				case 'T':
					placementTiles.push(
						new TowerEmplacement({
							position: {
								x: x * tileSize,
								y: y * tileSize,
							},
						})
					);
			}
		}
	}
}
