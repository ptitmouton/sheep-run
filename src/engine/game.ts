import { BaseLevel } from './base-level';

export class Game {
    protected canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public setCurrentLevel(level: BaseLevel) {
        level.load().then(() => {
            level.start(this.canvas);
        });
    }
}
