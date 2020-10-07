import './index.css';
import { Background } from './entities/background';
import { Platform } from './entities/platform';
import { Player } from './entities/player';
import { Game } from './engine/game';

const gameWidth = 1024;
const gameHeight = 512;

let canvas;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', gameWidth);
    canvas.setAttribute('height', gameHeight);
    document.body.append(canvas);

    Promise.all([
        Background.load(),
        Platform.load(),
        Player.load()
    ]).then(() => {
        const entities = [
            new Background(gameWidth, gameHeight),
            new Platform(100, 282),
            new Platform(250, 282),
            new Platform(500, 282),
            new Platform(700, 282),
        ];
        const player = new Player(125, 240);
        const game = new Game(canvas, entities, player);

        game.init();
    });
});
