export class Platform {
    private url = require('../assets/platform.png').default;

    private parentCanvas: HTMLCanvasElement;

    private x: number;

    private y: number;

    constructor(parentCanvas: HTMLCanvasElement, x: number, y: number) {
        this.parentCanvas = parentCanvas;
        this.x = x;
        this.y = y;
    }

    load() {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                const ctx = this.parentCanvas.getContext('2d');
                ctx.drawImage(image, this.x, this.y, 100, 65);
                resolve();
            });
            image.addEventListener('error', reject)
            image.src = this.url;
        });
    }
}
