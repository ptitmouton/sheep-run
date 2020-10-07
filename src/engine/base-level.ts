import { BaseBackground } from '../engine/base-background';
import { BaseObject } from '../engine/base-object';
import { BasePlayer, PlayerState } from '../engine/base-player';
import { Input } from '../engine/input';
import { clamp } from 'lodash';

export class BaseLevel {
    private groundLevel: number = 0;

    private background: BaseBackground;

    private objects: BaseObject[];

    private player: BasePlayer;

    constructor({ background, objects, player, groundLevel }: { background: BaseBackground, objects: BaseObject[], player: BasePlayer, groundLevel: number }) {
        this.background = background;
        this.objects = objects;
        this.player = player;
        this.groundLevel = groundLevel;
    }

    public load() {
        return Promise.all(
            [...new Set([
                this.background,
                ...this.objects,
                this.player
            ].map(o => o.constructor))].map(uniqueClass =>
                (uniqueClass as typeof BaseObject).load()
            )
        );
    }

    public start(canvas: HTMLCanvasElement) {
        this.next(canvas, 0);
        document.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                this.player.jump();
            }
        });
    }

    protected animate(timestamp: number) {
        this.objects.forEach(entity => {
            entity.animate(timestamp);
            entity.update();
        });
        this.player.animate(timestamp);
        this.player.update();
    }

    public updatePlayer() {
        if (Input.leftKey) {
            this.player.isMirrored = true;
            this.player.velocity[0] = clamp(this.player.velocity[0]+.5, 0, 4);
        }
        if (Input.rightKey) {
            this.player.isMirrored = false;
            this.player.velocity[0] = clamp(this.player.velocity[0]+.5, 0, 4);
        }

        if (this.player.velocity[1] < 0) {
            this.player.y += this.player.velocity[1];
            this.player.velocity[1] += .2;
        } else if (this.player.y < this.groundLevel) {
            this.player.velocity[1] += .5;
            this.player.y += this.player.velocity[1];
        } else {
            this.player.jumpCount = 0;
            this.player.velocity[1] = 0;
            this.player.y = this.groundLevel;
        }

        if (this.player.velocity[0] <= 0) {
            this.player.velocity[0] = 0;
        } else {
            this.player.velocity[0] -= .25;
            if (this.player.isMirrored) {
                this.player.x -= this.player.velocity[0];
            } else {
                this.player.x += this.player.velocity[0];
            }
        }

        if (this.player.velocity[1] > 0) {
            this.player.setState(PlayerState.Fall);
        } else if (this.player.velocity[1] < 0) {
            this.player.setState(PlayerState.Jump);
        } else if (this.player.velocity[0] != 0) {
            this.player.setState(PlayerState.Run);
        } else {
            this.player.setState(PlayerState.Idle);
        }
    }


    protected next(canvas: HTMLCanvasElement, timestamp: number) {
        if (this.objects) {
            this.updatePlayer();
            this.animate(timestamp);
            this.render(canvas);
        }
        requestAnimationFrame(timestamp => this.next(canvas, timestamp));
    }

    protected render(canvas: HTMLCanvasElement) {
        this.background.render(canvas);
        this.objects.forEach(baseObj => baseObj.render(canvas));
        this.player.render(canvas);
    }
}
