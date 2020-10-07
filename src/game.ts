import { BaseObject } from './entities/base-object';
import { Player } from './entities/player';

export class Game {
    protected canvas: HTMLCanvasElement;

    protected entities: BaseObject[];

    protected player: Player;

    protected isPlaying: boolean = true;

    constructor(canvas: HTMLCanvasElement, entities: BaseObject[], player: Player) {
        this.canvas = canvas;
        this.entities = entities;
        this.player = player;
    }

    public init() {
        this.next(0);
    }

    protected update(timestamp: number) {
        this.entities.forEach(entity => entity.update(timestamp));
        this.player.update(timestamp);
    }

    protected next(timestamp: number) {
        if (this.isPlaying) {
            this.update(timestamp);
            this.render();
        }
        requestAnimationFrame(timestamp => this.next(timestamp));
    }

    protected render() {
        this.entities.forEach(entity => entity.render(this.canvas));
        this.player.render(this.canvas);
    }
}
