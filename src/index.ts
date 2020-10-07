import './index.css';
import { Background } from './entities/background';
import { Platform } from './entities/platform';

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
        Platform.load()
    ]).then(() => {
        const background = new Background(gameWidth, gameHeight);
        const platforms = [
            new Platform(100, 282),
            new Platform(250, 282),
            new Platform(500, 282),
            new Platform(700, 282),
        ];

        background.render(canvas);
        platforms.map(p => p.render(canvas));
    });
});
