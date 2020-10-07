import { BaseObject } from './base-object';

export enum PlayerState {
    Idle,
    Jump,
    Run
};

export class Player extends BaseObject {
    protected static urls = new Map([
        [PlayerState.Idle, require('../assets/Black_sheep_Idle.png').default],
        [PlayerState.Jump, require('../assets/Black_sheep_Jump.png').default],
        [PlayerState.Run, require('../assets/Black_sheep_Run.png').default],
    ]);

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.animationSteps = 4;
    }
}
