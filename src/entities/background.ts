import { BaseObject } from './base-object';

export class Background extends BaseObject {
    protected static urls = new Map([
        [0, require('../assets/background2.png').default]
    ]);

    protected x = 0;

    protected y = 0;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

}
