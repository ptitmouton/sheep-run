export abstract class BaseEntity {
    protected static urls: Map<number, string> = new Map();

    protected static images: Map<string, HTMLImageElement> = new Map();

    protected currentState: number = 0;

    protected x: number;

    protected y: number;

    protected width: number;

    protected height: number;

    static load() {
        return Promise.all(
            Array.from(this.urls.entries())
                .map(([state, url]) => new Promise((resolve, reject) => {
                    const image = new Image();
                    image.addEventListener('load', () => {
                        this.images.set(`${this.name}-${state}`, image);
                        console.log('image loaded');
                        resolve();
                    });
                    console.log('image will load');
                    image.addEventListener('error', reject)
                    image.src = url;
            }))
        );
    }

    render(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        context.drawImage((this.constructor as typeof BaseEntity).images.get(`${this.constructor.name}-${this.currentState}`), this.x, this.y, this.width, this.height);
    }
}
