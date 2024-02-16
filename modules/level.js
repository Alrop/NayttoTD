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
	{ x: 3, y: -1 },
	{ x: 3, y: 11 },
	{ x: 7, y: 11 },
	{ x: 7, y: 3 },
	{ x: 20, y: 3 },
	{ x: 20, y: 7 },
	{ x: 12, y: 7 },
	{ x: 12, y: 16 },
	{ x: 16, y: 16 },
	{ x: 16, y: 12 },
	{ x: 24, y: 12 },
];

const tiles = [];

const pathLR = new Image();
pathLR.src = "../gfx/tiles/path_lr.png";
const pathUD = new Image();
pathUD.src = "../gfx/tiles/path_ud.png";
const pathDL = new Image();
pathDL.src = "../gfx/tiles/path_dl.png";
const pathDR = new Image();
pathDR.src = "../gfx/tiles/path_dr.png";
const pathUL = new Image();
pathUL.src = "../gfx/tiles/path_ul.png";
const pathUR = new Image();
pathUR.src = "../gfx/tiles/path_ur.png";
const empty = new Image();
empty.src = "../gfx/tiles/grass.png";
const empty1 = new Image();
empty1.src = "../gfx/tiles/grass1.png";
const empty2 = new Image();
empty2.src = "../gfx/tiles/grass2.png";
const empty3 = new Image();
empty3.src = "../gfx/tiles/flowers.png";
const towerPlace = new Image();
towerPlace.src = "../gfx/tiles/tower_spot.png";

export function renderLevel() {
	for (let y = 0; y < tiles.length; y++) {
		const row = tiles[y];
		for (let x = 0; x < row.length; x++) {
			const tile = tiles[y][x];
			switch (tile) {
				case "path_lr":
					ctx.drawImage(pathLR, x * tileSize, y * tileSize);
					break;

				case "path_ud":
					ctx.drawImage(pathUD, x * tileSize, y * tileSize);
					break;
				
				case "path_dl":
					ctx.drawImage(pathDL, x * tileSize, y * tileSize);
					break;
				
				case "path_dr":
					ctx.drawImage(pathDR, x * tileSize, y * tileSize);
					break;
				
				case "path_ul":
					ctx.drawImage(pathUL, x * tileSize, y * tileSize);
					break;
				
				case "path_ur":
					ctx.drawImage(pathUR, x * tileSize, y * tileSize);
					break;
				
				case "empty1":
					ctx.drawImage(empty1, x * tileSize, y * tileSize);
					break;
				
				case "empty2":
					ctx.drawImage(empty2, x * tileSize, y * tileSize);
					break;

				case "empty3":
					ctx.drawImage(empty3, x * tileSize, y * tileSize);
					break;

				case "towerPlace":
					ctx.drawImage(towerPlace, x * tileSize, y * tileSize);
					break;
			
				default:
					ctx.drawImage(empty, x * tileSize, y * tileSize);
					break;
			}
		}
	}
}

export function loadLevel() {
	for (let y = 0; y < level.length; y++) {
		const row = level[y];
		const newRow = [];
		for (let x = 0; x < row.length; x++) {
			const tile = row[x];
			switch (tile) {
				case '.':
					const randomTile = Math.floor(Math.random() * 4);
					newRow.push("empty" + randomTile);
					break;
				case '#':
					newRow.push("path");
					break;
				case 'T':
					newRow.push("towerPlace");
					placementTiles.push(
						new TowerEmplacement({
							position: {
								x: x * tileSize,
								y: y * tileSize,
							},
						})
					);
					break;
				default:
					newRow.push("other");
					break;
			}
		}
		tiles.push(newRow);
	}

	// check path directions for drawing path
	for (let y = 0; y < tiles.length; y++) {
		const row = tiles[y];
		for (let x = 0; x < row.length; x++) {
			let tile = tiles[y][x];
			let above;
			try {
				above = tiles[y-1][x];
			} catch {
				above = "path";
			}
			let below;
			try {
				below = tiles[y+1][x];
			} catch {
				below = "path";
			}
			let left;
			try {
				left = tiles[y][x-1];
			} catch {
				left = "path";
			}
			if (tile == "path") {
				if (above.includes("path")) {
					if (below.includes("path")) {
						tiles[y][x] = "path_ud";
					}
					else if (left.includes("path")) {
						tiles[y][x] = "path_ul";
					}
					else {
						tiles[y][x] = "path_ur";
					}
				}
				else if (below.includes("path")) {
					if (left.includes("path")) {
						tiles[y][x] = "path_dl";
					}
					else {
						tiles[y][x] = "path_dr";
					}
				}
				else {
					tiles[y][x] = "path_lr";
				}
			}
		}
	}
}

// moved to loadLevel()

/* export function towerInit() {
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
*/