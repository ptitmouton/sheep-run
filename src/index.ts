import './index.css';
import { level1 } from './levels/level1/level1';
import { Game } from './engine/game';

const gameWidth = 1024;
const gameHeight = 512;

let canvas;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', gameWidth);
    canvas.setAttribute('height', gameHeight);
    document.body.append(canvas);

    const game = new Game(canvas);
    game.setCurrentLevel(level1);
});
