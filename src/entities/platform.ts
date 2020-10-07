import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';

export class Platform extends BaseObject {
    protected static spritesheets = new Map([
        [0, new Spritesheet(require('../assets/platform.png').default)]
    ]);

    protected width = 100;

    protected height = 65;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
