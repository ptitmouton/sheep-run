export abstract class BaseObject {
    protected static urls: Map<number, string> = new Map();

    protected static images: Map<string, HTMLImageElement> = new Map();

    protected currentState = 0;

    protected currentAnimationStep = 0;

    protected animationSteps = 1;

    protected x: number;

    protected y: number;

    protected width: number;

    protected height: number;

    protected lastUpdate = 0;

    protected updateEvery = 350;

    static load() {
        return Promise.all(
            Array.from(this.urls.entries())
                .map(([state, url]) => new Promise((resolve, reject) => {
                    const image = new Image();
                    image.addEventListener('load', () => {
                        this.images.set(`${this.name}-${state}`, image);
                        resolve();
                    });
                    image.addEventListener('error', reject)
                    image.src = url;
            }))
        );
    }

    protected shouldUpdate(timestamp: number) {
        return timestamp - this.lastUpdate >= this.updateEvery;
    }

    update(timestamp: number) {
        if (this.shouldUpdate(timestamp)) {
            if (this.currentAnimationStep === (this.constructor as typeof BaseEntity).urls.size - 1) {
                this.currentAnimationStep = 0;
            } else {
                this.currentAnimationStep++;
            }
            this.lastUpdate = timestamp;
        }
    }

    render(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        const image = (this.constructor as typeof BaseEntity).images.get(`${this.constructor.name}-${this.currentState}`);
        const tileWidth = image.width / this.animationSteps;
        context.drawImage(
            image,
            this.currentAnimationStep * tileWidth,
            0,
            tileWidth,
            image.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
