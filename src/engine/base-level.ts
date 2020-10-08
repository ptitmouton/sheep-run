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

    private gravity = 5;

    private debugMode = false;

    constructor({ background, objects, player, groundLevel }: { background: BaseBackground, objects: BaseObject[], player: BasePlayer, groundLevel: number }) {
        this.background = background;
        this.objects = objects;
        this.player = player;
        this.groundLevel = groundLevel;
    }

    private canGoTo(x: number, y: number) {
        if (y >= this.groundLevel) {
            return false;
        }
        const overlappingObject = this.objects.find(object => object.overlaps({ x, y, width: this.player.width, height: this.player.height }));
        if (overlappingObject) {
            return false;
        }
        return true;
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
            if (e.code === 'KeyH') {
                this.debugMode = !this.debugMode;
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

        let [newX, newY] = [this.player.x, this.player.y];
        let isGrounded = false;
        if (this.player.velocity[1] < 0) {
            // player jumped
            newY += this.player.velocity[1];
            if (this.canGoTo(this.player.x, newY)) {
                this.player.y = newY;
            }
            this.player.velocity[1] += .2;
        } else {
            //  player is dragged down
            if (this.player.velocity[1] <= this.gravity) {
                this.player.velocity[1] += .5;
            }
            newY += this.player.velocity[1];
            if (this.canGoTo(this.player.x, newY)) {
                this.player.y = newY;
            } else {
                // Player cannot go down. So he seems grounded
                this.player.jumpCount = 0;
                isGrounded = true;
            }
        }

        if (this.player.velocity[0] <= 0) {
            this.player.velocity[0] = 0;
        } else {
            this.player.velocity[0] -= .25;
            if (this.player.isMirrored) {
                newX -= this.player.velocity[0];
            } else {
                newX += this.player.velocity[0];
            }
            if (this.canGoTo(newX, this.player.y)) {
                this.player.x = newX;
            }
        }

        if (isGrounded) {
            if (this.player.velocity[0] != 0) {
                this.player.setState(PlayerState.Run);
            } else {
                this.player.setState(PlayerState.Idle);
            }
        } else {
            if (this.player.velocity[1] > 0) {
                this.player.setState(PlayerState.Fall);
            } else {
                this.player.setState(PlayerState.Jump);
            }
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
        if (this.debugMode) {
            this.renderDebug(canvas);
        }
    }

    protected renderDebug(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000';
        ctx.font = '42x sans-serif';
        ctx.fillText(`x: ${this.player.x}`, 20, 20);
        ctx.fillText(`y: ${this.player.y}`, 20, 30);
        ctx.fillText(`y: ${this.player.y}`, 20, 30);
        ctx.fillText(`velocityX: ${this.player.velocity[0]}`, 20, 40);
        ctx.fillText(`velocityY: ${this.player.velocity[1]}`, 20, 50);
    }
}
