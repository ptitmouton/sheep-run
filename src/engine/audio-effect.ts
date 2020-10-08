export class AudioEffect {
    protected url: string;

    public audio: HTMLAudioElement;

    constructor(url: string) {
        this.url = url;
    }

    public load() {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.addEventListener('canplaythrough', () => {
                resolve();
            });
            audio.addEventListener('error', reject)
            audio.src = this.url;
            this.audio = audio;
        });
    }

    public play() {
        this.audio.play();
    }

}
