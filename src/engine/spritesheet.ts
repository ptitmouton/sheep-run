export class Spritesheet {
    constructor(url: string, tilesCount = 1) {
        this.url = url;
        this.tilesCount = tilesCount;
    }

    public image: HTMLImageElement | null = null;

    protected url: string;

    protected tilesCount: number = 1;

    public get tilesWidth() {
        return this.image.width / this.tilesCount;
    }

    public get size() {
        return this.tilesCount;
    }

    public load() {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                resolve();
            });
            image.addEventListener('error', reject)
            image.src = this.url;
            this.image = image;
        });
    }

    public getBoundingRectForIndex(index: number) {
        const tileWidth = this.image.width / this.tilesCount;
        return {
            x: index * tileWidth,
            y: 0,
            width: tileWidth,
            height: this.image.height
        };
    }

    public draw(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) {
        canvas.getContext('2d').drawImage(
            this.image,
            boundingRect.x,
            boundingRect.y,
            boundingRect.width,
            boundingRect.height,
            x,
            y,
            width,
            height
        );
    }
}
