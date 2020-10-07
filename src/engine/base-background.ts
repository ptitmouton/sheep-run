import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';

export class BaseBackground extends BaseObject {
    protected static spritesheets = new Map([
        [0, new Spritesheet(require('../assets/background2.png').default)]
    ]);

    protected x = 0;

    protected y = 0;

    protected width = 1024;

    protected height = 512;
}
