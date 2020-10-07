import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';

export enum PlayerState {
    Idle,
    Jump,
    Run
};

export class Player extends BaseObject {
    protected static spritesheets = new Map([
        [PlayerState.Idle, new Spritesheet(require('../assets/player/HeroKnight_Idle.png').default, 8)],
        [PlayerState.Jump, new Spritesheet(require('../assets/player/HeroKnight_Jump.png').default, 8)],
        [PlayerState.Run, new Spritesheet(require('../assets/player/HeroKnight_Run.png').default, 10)],
    ]);

    protected width = 110;

    protected height = 90;

    protected groundLevel = 0;

    protected jumpCount = 0;

    constructor(x: number, groundLevel: number) {
        super();
        this.x = x;
        this.y = groundLevel;
        this.groundLevel = groundLevel;
    }

    public goRight() {
        this.isMirrored = false;
        this.velocity[0] = 7.5;
    }

    public goLeft() {
        this.isMirrored = true;
        this.velocity[0] = 7.5;
    }

    public rest() {
        this.velocity[0] = 0;
    }

    public update() {
        if (this.velocity[0] <= 0) {
            this.currentState = PlayerState.Idle;
            this.velocity[0] = 0;
        } else {
            this.currentState = PlayerState.Run;
            this.velocity[0] -= .25;
            if (this.isMirrored) {
                this.x -= this.velocity[0];
            } else {
                this.x += this.velocity[0];
            }
        }

        if (this.velocity[1] <= 0) {
            this.y += this.velocity[1];
            this.velocity[1] += .5;
        } else if (this.y <= this.groundLevel) {
            this.velocity[1] += .5;
            this.y += this.velocity[1];
        } else {
            this.jumpCount = 0;
            this.velocity[1] = 0;
            this.y = this.groundLevel;
        }
    }

    public jump() {
        if (this.jumpCount < 2) {
            this.jumpCount++;
            this.currentState = PlayerState.Jump;
            this.velocity[1] = -10;
        }
    }

    public onAnimationCycleTerminate() { }
}
