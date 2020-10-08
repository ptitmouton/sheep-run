import { Spritesheet } from './spritesheet';
import { AudioEffect } from './audio-effect';

export abstract class BaseObject {
    protected static spritesheets: Map<number, Spritesheet> = new Map();

    protected static audio: Map<number, AudioEffect> = new Map();

    public currentState = 0;

    public currentAnimationStep = 0;

    public velocity: [number, number] = [0, 3];

    public x: number;

    public y: number;

    public width: number;

    public height: number;

    protected lastAnimate = 0;

    public animationSpeed = 250;

    public isMirrored = false;

    public boundingMargin = [40, 5];

    public static load() {
        return Promise.all([
            ...Array.from(this.spritesheets.entries())
                .map(([state]) => this.spritesheets.get(state).load()),
            ...Array.from(this.audio.entries())
                .map(([state]) => this.audio.get(state).load())
        ]);
    }

    public playSound(sound: number) {
        (this.constructor as typeof BaseObject).audio.get(sound).play();
    }

    protected shouldAnimate(timestamp: number) {
        return timestamp - this.lastAnimate >= this.animationSpeed;
    }

    public contains(x: number, y: number) {
        return (
            x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height
        );
    }

    public overlaps(otherObject: { x: number; y: number; width: number; height: number; }) {
        return (
            otherObject.x + otherObject.width >= this.x + this.boundingMargin[0] &&
            otherObject.x + this.boundingMargin[0] <= this.x + this.width &&
            otherObject.y + otherObject.height >= this.y + this.boundingMargin[1] &&
            otherObject.y + this.boundingMargin[1] <= this.y + this.height
        );
    }

    public animate(timestamp: number) {
        if (this.shouldAnimate(timestamp)) {
            if (this.currentAnimationStep >= (this.constructor as typeof BaseObject).spritesheets.get(this.currentState).size - 1) {
                this.currentAnimationStep = 0;
                this.onAnimationCycleTerminate(this.currentState);
            } else {
                this.currentAnimationStep++;
            }
            this.lastAnimate = timestamp;
        }
    }

    protected onSetState(oldState: number, newState: number) {
        this.currentAnimationStep = 0;
    }

    public setState(state: number) {
        if (this.currentState !== state) {
            this.onSetState(this.currentState, state);
            this.currentState = state;
        }
    }

    public update() { }

    protected onAnimationCycleTerminate(newState: number) {}

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
