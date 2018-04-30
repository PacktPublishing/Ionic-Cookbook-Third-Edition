import { Injectable } from '@angular/core';

@Injectable()
export class AudioProvider {
    track:any;
    isPaused: Boolean = false;
    url;
    play(url) {
        if(this.url !== url) {
            this.url = url;
            this.track = new Audio(url);
            this.track.load();
        }
        this.track.play();
    }
    pause() {
        this.track.pause();
        this.isPaused = true;
    }
    // stop() {
    //     this.track.pause();
    //     this.track.currentTime = 0;
    //     this.isPaused = false;
    // }

}