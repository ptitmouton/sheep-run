import './index.css';
import { Background } from './entities/background';
import { Platform } from './entities/platform';

let canvas;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', 1024);
    canvas.setAttribute('height', 512);
    document.body.append(canvas);
    
    const background = new Background(canvas);
    const platforms = [
        new Platform(canvas, 100, 282),
        new Platform(canvas, 250, 282),
        new Platform(canvas, 500, 282),
        new Platform(canvas, 700, 282),
    ];

    Promise.all([
        background.load(),
        ...platforms.map(p => p.load())
    ]);
});
