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

    private frameDuration = 0;

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
        if (Input.actionKey) {
            this.player.isAttacking = true;
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

        if (this.player.isAttacking) {
            this.player.setState(this.player.isMirrored ? PlayerState.AttackMirrored : PlayerState.Attack);
        } else if (isGrounded) {
            if (this.player.velocity[0] != 0) {
                this.player.setState(this.player.isMirrored ? PlayerState.RunMirrored : PlayerState.Run);
            } else {
                this.player.setState(this.player.isMirrored ? PlayerState.IdleMirrored : PlayerState.Idle);
            }
        } else {
            if (this.player.velocity[1] > 0) {
                this.player.setState(this.player.isMirrored ? PlayerState.FallMirrored : PlayerState.Fall);
            } else {
                this.player.setState(this.player.isMirrored ? PlayerState.JumpMirrored : PlayerState.Jump);
            }
        }
    }


    protected next(canvas: HTMLCanvasElement, timestamp: number) {
        if (this.objects) {
            this.updatePlayer();
            this.animate(timestamp);
            this.render(canvas);
        }
        requestAnimationFrame(ts => {
            this.frameDuration = ts - timestamp;
            this.next(canvas, ts);
        });
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
        ctx.fillText(`FPS: ${Math.floor(1000 / this.frameDuration)}`, 20, 15);
        ctx.fillText(`x: ${this.player.x}`, 20, 30);
        ctx.fillText(`y: ${this.player.y}`, 20, 45);
        ctx.fillText(`y: ${this.player.y}`, 20, 60);
        ctx.fillText(`velocityX: ${this.player.velocity[0]}`, 20, 75);
        ctx.fillText(`velocityY: ${this.player.velocity[1]}`, 20, 90);

        ctx.fillText(`jumpCount: ${this.player.jumpCount}`, 100, 15);
        ctx.fillText(`isAttacking: ${this.player.isAttacking}`, 100, 30);
        ctx.fillText(`isMirrored: ${this.player.isAttacking}`, 100, 45);
        ctx.fillText(`playerState: ${this.player.currentState}`, 100, 60);
        ctx.fillText(`animationStep: ${this.player.currentAnimationStep}`, 100, 75);
    }
}
