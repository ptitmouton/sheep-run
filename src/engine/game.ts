import { BaseObject } from './base-object';
import { Player } from '../entities/player';

export class Game {
    protected canvas: HTMLCanvasElement;

    protected entities: BaseObject[];

    protected player: Player;

    protected isPlaying = true;

    constructor(canvas: HTMLCanvasElement, entities: BaseObject[], player: Player) {
        this.canvas = canvas;
        this.entities = entities;
        this.player = player;
    }

    public init() {
        this.next(0);
        this.player.run();
        document.addEventListener('keydown', e => {
            if (e.keyCode === 27) { // ESCAPE
                this.isPlaying = !this.isPlaying;
            } else if (e.keyCode === 32) { // SPACE
                this.player.jump();
            }
        });
    }

    protected animate(timestamp: number) {
        this.entities.forEach(entity => {
            entity.animate(timestamp);
            entity.update();
        });
        this.player.animate(timestamp);
        this.player.update();
    }

    protected next(timestamp: number) {
        if (this.isPlaying) {
            this.animate(timestamp);
            this.render();
        }
        requestAnimationFrame(timestamp => this.next(timestamp));
    }

    protected render() {
        this.entities.forEach(entity => entity.render(this.canvas));
        this.player.render(this.canvas);
    }
}
