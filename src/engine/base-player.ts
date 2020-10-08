import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';

export enum PlayerState {
    Idle,
    IdleMirrored,
    Jump,
    JumpMirrored,
    Fall,
    FallMirrored,
    Run,
    RunMirrored,
};

export class BasePlayer extends BaseObject {
    protected static spritesheets = new Map([
        [PlayerState.Idle, new Spritesheet(require('../assets/player/HeroKnight_Idle.png').default, 8)],
        [PlayerState.IdleMirrored, new Spritesheet(require('../assets/player/HeroKnight_Idle_Mirrored.png').default, 8)],
        [PlayerState.Jump, new Spritesheet(require('../assets/player/HeroKnight_Jump.png').default, 3)],
        [PlayerState.JumpMirrored, new Spritesheet(require('../assets/player/HeroKnight_Jump_Mirrored.png').default, 3)],
        [PlayerState.Run, new Spritesheet(require('../assets/player/HeroKnight_Run.png').default, 10)],
        [PlayerState.RunMirrored, new Spritesheet(require('../assets/player/HeroKnight_Run_Mirrored.png').default, 10)],
        [PlayerState.Fall, new Spritesheet(require('../assets/player/HeroKnight_Fall.png').default, 4)],
        [PlayerState.FallMirrored, new Spritesheet(require('../assets/player/HeroKnight_Fall_Mirrored.png').default, 4)],
    ]);

    public width = 100;

    public height = 55;

    public groundLevel = 0;

    public jumpCount = 0;

    public animationSpeed = 100;

    constructor(x: number, groundLevel: number) {
        super();
        this.x = x;
        this.y = groundLevel;
        this.groundLevel = groundLevel;
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
