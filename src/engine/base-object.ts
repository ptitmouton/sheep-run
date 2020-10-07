import { Spritesheet } from './spritesheet';

export abstract class BaseObject {
    protected static spritesheets: Map<number, Spritesheet> = new Map();

    protected currentState = 0;

    protected currentAnimationStep = 0;

    public velocity: [number, number] = [0, 3];

    public x: number;

    public y: number;

    public width: number;

    public height: number;

    protected lastAnimate = 0;

    public animationSpeed = 250;

    public isMirrored = false;

    public static load() {
        return Promise.all(
            Array.from(this.spritesheets.entries())
                .map(([state]) => this.spritesheets.get(state).load())
        );
    }

    protected shouldAnimate(timestamp: number) {
        return timestamp - this.lastAnimate >= this.animationSpeed;
    }

    public animate(timestamp: number) {
        if (this.shouldAnimate(timestamp)) {
            if (this.currentAnimationStep >= (this.constructor as typeof BaseObject).spritesheets.get(this.currentState).size - 1) {
                this.currentAnimationStep = 0;
                this.onAnimationCycleTerminate();
            } else {
                this.currentAnimationStep++;
            }
            this.lastAnimate = timestamp;
        }
    }

    public setState(state: number) {
        if (this.currentState !== state) {
            this.currentAnimationStep = 0;
            console.debug(`set ${this.constructor.name} state: ${state}`);
            this.currentState = state;
        }
    }

    public update() { }

    public onAnimationCycleTerminate() {}

    public render(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        const spritesheet = (this.constructor as typeof BaseObject).spritesheets.get(this.currentState);
        const boundingRect = spritesheet.getBoundingRectForIndex(this.currentAnimationStep);
        context.drawImage(
            spritesheet.image,
            boundingRect.x,
            boundingRect.y,
            boundingRect.width,
            boundingRect.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
