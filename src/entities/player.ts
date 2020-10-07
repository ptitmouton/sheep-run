import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';
import { Input } from '../engine/input';
import { clamp } from 'lodash';

export enum PlayerState {
    Idle,
    Jump,
    Fall,
    Run
};

export class Player extends BaseObject {
    protected static spritesheets = new Map([
        [PlayerState.Idle, new Spritesheet(require('../assets/player/HeroKnight_Idle.png').default, 8)],
        [PlayerState.Jump, new Spritesheet(require('../assets/player/HeroKnight_Jump.png').default, 3)],
        [PlayerState.Run, new Spritesheet(require('../assets/player/HeroKnight_Run.png').default, 10)],
        [PlayerState.Fall, new Spritesheet(require('../assets/player/HeroKnight_Fall.png').default, 4)],
    ]);

    protected width = (this.constructor as typeof BaseObject).spritesheets.get(0).tileWidth;

    protected height = (this.constructor as typeof BaseObject).spritesheets.get(0).tileHeight;

    protected groundLevel = 0;

    protected jumpCount = 0;

    protected animationSpeed = 100;

    constructor(x: number, groundLevel: number) {
        super();
        this.x = x;
        this.y = groundLevel;
        this.groundLevel = groundLevel;
    }

    public update() {
        if (Input.leftKey) {
            this.isMirrored = true;
            this.velocity[0] = clamp(this.velocity[0]+.5, 0, 4);
        }
        if (Input.rightKey) {
            this.isMirrored = false;
            this.velocity[0] = clamp(this.velocity[0]+.5, 0, 4);
        }

        if (this.velocity[1] < 0) {
            this.y += this.velocity[1];
            this.velocity[1] += .2;
        } else if (this.y < this.groundLevel) {
            this.velocity[1] += .5;
            this.y += this.velocity[1];
        } else {
            this.jumpCount = 0;
            this.velocity[1] = 0;
            this.y = this.groundLevel;
        }

        if (this.velocity[0] <= 0) {
            this.velocity[0] = 0;
        } else {
            this.velocity[0] -= .25;
            if (this.isMirrored) {
                this.x -= this.velocity[0];
            } else {
                this.x += this.velocity[0];
            }
        }

        if (this.velocity[1] > 0) {
            this.setState(PlayerState.Fall);
        } else if (this.velocity[1] < 0) {
            this.setState(PlayerState.Jump);
        } else if (this.velocity[0] != 0) {
            this.setState(PlayerState.Run);
        } else {
            this.setState(PlayerState.Idle);
        }
    }

    public jump() {
        if (this.jumpCount < 2) {
            this.jumpCount++;
            this.setState(PlayerState.Jump);
            this.velocity[1] = -5;
        }
    }

    public onAnimationCycleTerminate() { }
}
