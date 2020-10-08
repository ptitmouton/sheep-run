import { BaseObject } from '../engine/base-object';
import { Spritesheet } from '../engine/spritesheet';
import {AudioEffect} from './audio-effect';

export enum PlayerState {
    Idle,
    IdleMirrored,
    Jump,
    JumpMirrored,
    Fall,
    FallMirrored,
    Run,
    RunMirrored,
    Attack,
    AttackMirrored,
};

export enum PlayerAudio {
    Jump,
    Attack,
}

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
        [PlayerState.Attack, new Spritesheet(require('../assets/player/HeroKnight_Attack.png').default, 8)],
        [PlayerState.AttackMirrored, new Spritesheet(require('../assets/player/HeroKnight_Attack_Mirrored.png').default, 8)],
    ]);

    protected static audio = new Map([
        [PlayerAudio.Jump, new AudioEffect(require('../assets/player/jump.wav').default)],
        [PlayerAudio.Attack, new AudioEffect(require('../assets/player/attack.wav').default)]
    ]);

    public width = 100;

    public height = 55;

    public jumpCount = 0;

    public isAttacking = false;

    public animationSpeed = 100;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    public jump() {
        if (this.jumpCount < 2) {
            this.jumpCount++;
            this.setState(PlayerState.Jump);
            this.velocity[1] = -5;
        }
    }

    public onAnimationCycleTerminate() {
        if (PlayerState.Attack) {
            this.isAttacking = false;
            this.setState(PlayerState.Idle)
        }
        if (PlayerState.AttackMirrored) {
            this.isAttacking = false;
            this.setState(PlayerState.IdleMirrored)
        }
    }

    public onSetState(oldState: PlayerState, newState: PlayerState) {
        super.onSetState(oldState, newState);
        if (
            (newState === PlayerState.Jump || newState === PlayerState.JumpMirrored) &&
            oldState !== PlayerState.Jump && oldState !== PlayerState.JumpMirrored) {
            this.playSound(PlayerAudio.Jump);
        }
        if (
            (newState === PlayerState.Attack || newState === PlayerState.AttackMirrored) &&
            oldState !== PlayerState.Attack && oldState !== PlayerState.AttackMirrored) {
            this.playSound(PlayerAudio.Attack);
        }
    }
}
