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
        document.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                this.isPlaying = !this.isPlaying;
            } else if (e.code === 'Space') {
                this.player.jump();
            } else if (e.code === 'ArrowLeft') { 
                this.player.goLeft();
            } else if (e.code === 'ArrowRight') { 
                this.player.goRight();
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
