import { BaseEntity } from './base-entity';

export class Platform extends BaseEntity {
    protected static urls = new Map([
        [0, require('../assets/platform.png').default]
    ]);

    protected width = 100;

    protected height = 65;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
