/** @format */

import { ctx, tileSize, placementTiles } from '../main.js';
import { TowerEmplacement } from '../towers.js';

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

export function renderLevel() {
	for (let y = 0; y < level.length; y++) {
		const row = level[y];
		for (let x = 0; x < row.length; x++) {
			const tile = row[x];
			if (tile == '#') {
				ctx.fillStyle = 'white';
				ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
			}
			if (tile == 'T') {
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
