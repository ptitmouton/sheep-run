import './index.css';
import { Background } from './entities/background';

let canvas;
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', 1024);
    canvas.setAttribute('height', 512);
    document.body.append(canvas);
    
    const background = new Background(canvas);

    background.load();
});
