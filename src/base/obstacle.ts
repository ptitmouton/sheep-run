import { BaseObject } from '../engine/base-object';

export class Obstacle extends BaseObject {
    public speed: number = 1;

    constructor(speed: number) {
        super();
        this.speed = speed;
    }

    public update() {
        // if (this.x + this.width < 0) {
        //     this.x = 1024;
        // } else {
        //     this.x -= this.speed;
        // }
    }
}
