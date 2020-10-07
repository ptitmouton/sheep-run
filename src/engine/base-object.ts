import { Spritesheet } from './spritesheet';

export abstract class BaseObject {
    protected static spritesheets: Map<number, Spritesheet> = new Map();

    protected currentState = 0;

    protected currentAnimationStep = 0;

    protected animationSteps = 1;

    protected x: number;

    protected y: number;

    protected width: number;

    protected height: number;

    protected lastAnimate = 0;

    protected animateEvery = 350;

    static load() {
        return Promise.all(
            Array.from(this.spritesheets.entries())
                .map(([state]) => this.spritesheets.get(state).load())
        );
    }

    protected shouldAnimate(timestamp: number) {
        return timestamp - this.lastAnimate >= this.animateEvery;
    }

    animate(timestamp: number) {
        if (this.shouldAnimate(timestamp)) {
            if (this.currentAnimationStep === (this.constructor as typeof BaseObject).spritesheets.get(this.currentState).size - 1) {
                this.currentAnimationStep = 0;
            } else {
                this.currentAnimationStep++;
            }
            this.lastAnimate = timestamp;
        }
    }

    update() {
    }

    render(canvas: HTMLCanvasElement) {
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
