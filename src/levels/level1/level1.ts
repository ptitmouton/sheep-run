import { BaseLevel } from '../../engine/base-level';
import { BasePlayer } from '../../engine/base-player';
import { Background } from './background';
import { Platform } from '../../entities/platform';

export const level1 = new BaseLevel({
    groundLevel: 400,
    background: new Background(),
    objects: [
        new Platform(100, 382),
        new Platform(250, 327),
        new Platform(500, 299),
        new Platform(700, 340),
        new Platform(867, 382),
        new Platform(999, 300),
    ],
    player: new BasePlayer(10, 400)
});
