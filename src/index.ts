import './index.css';
import { level1 } from './levels/level1/level1';
import { Game } from './engine/game';

const gameWidth = 1024;
const gameHeight = 512;

document.addEventListener('DOMContentLoaded', () => {
    const helpButton = document.createElement('button');
    helpButton.classList.add('help-button');
    helpButton.innerText = 'Help';
    helpButton.addEventListener('click', () => {
        alert(`
Move Left: A / ArrowLeft
Move Up: D / ArrowRight
Jump: Space
Attack: ShiftLeft / ShiftRight
Debug: h
        `);
    });
    document.body.append(helpButton);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', String(gameWidth));
    canvas.setAttribute('height', String(gameHeight));
    document.body.append(canvas);

    const game = new Game(canvas);
    game.setCurrentLevel(level1);
});
