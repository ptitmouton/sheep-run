export class Background {
    private url = require('../assets/background2.png').default;

    private parentCanvas = null;

    constructor(parentCanvas) {
        this.parentCanvas = parentCanvas;
    }

    load() {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                const ctx = this.parentCanvas.getContext('2d');
                ctx.drawImage(image, 0, 0, this.parentCanvas.width, this.parentCanvas.height);
                resolve();
            });
            image.addEventListener('error', reject)
            image.src = this.url;
        });
    }
}
