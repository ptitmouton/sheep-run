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

    public get tileWidth() {
        return this.image.width / this.tilesCount;
    }

    public get tileHeight() {
        return this.image.height;
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
        return {
            x: index * this.tileWidth,
            y: 0,
            width: this.tileWidth,
            height: this.image.height
        };
    }
}
