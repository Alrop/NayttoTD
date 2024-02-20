/** @format */

import { ctx } from '../main.js';
export const btnArcher = {
	position: { x: 780, y: 200 },
	size: { x: 170, y: 100 },
	text: 'Archer tower',
};
export const btnMagic = {
	position: { x: 780, y: 310 },
	size: { x: 170, y: 100 },
	text: 'Magic tower',
};
export function openMenu() {
	ctx.fillStyle = 'green';
	ctx.fillRect(
		btnArcher.position.x,
		btnArcher.position.y,
		btnArcher.size.x,
		btnArcher.size.y
	);
	ctx.fillStyle = 'blue';
	ctx.fillRect(
		btnMagic.position.x,
		btnMagic.position.y,
		btnMagic.size.x,
		btnMagic.size.y
	);
	ctx.fillStyle = 'white';
	ctx.fillText(btnArcher.text, 820, 250, 100);
	ctx.fillText(btnMagic.text, 820, 350, 100);
}
