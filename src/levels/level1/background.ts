import { BaseBackground } from '../../engine/base-background';
import { Spritesheet } from '../../engine/spritesheet';

export class Background extends BaseBackground {
    protected static spritesheets = new Map([
        [0, new Spritesheet(require('./background.png').default)]
    ]);

}
