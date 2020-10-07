import { Obstacle } from '../base/obstacle';
import { Spritesheet } from '../engine/spritesheet';

export class Platform extends Obstacle {
    protected static spritesheets = new Map([
        [0, new Spritesheet(require('../assets/platform.png').default)]
    ]);

    public width = 50;

    public height = 30;

    constructor(x: number, y: number) {
        super(2);
        this.x = x;
        this.y = y;
    }
}
