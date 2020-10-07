import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';

export enum PlayerState {
    Idle,
    Jump,
    Run
};

export class Player extends BaseObject {
    protected static spritesheets = new Map([
        [PlayerState.Idle, new Spritesheet(require('../assets/Black_sheep_Idle.png').default, 4)],
        [PlayerState.Jump, new Spritesheet(require('../assets/Black_sheep_Jump.png').default, 8)],
        [PlayerState.Run, new Spritesheet(require('../assets/Black_sheep_Run.png').default, 6)],
    ]);

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.animationSteps = 4;
    }

    public run() {
        this.currentState = PlayerState.Run;
        this.animateEvery = 100;
    }
}
