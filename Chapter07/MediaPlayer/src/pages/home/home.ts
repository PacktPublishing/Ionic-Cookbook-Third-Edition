import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MusicControls } from '@ionic-native/music-controls';
import { AudioProvider} from '../../services/audio-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  track = {
    src: 'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
    artist: 'Nusrat Fateh Ali Khan',
    title: 'Man Atkiya Beparwah De Naal',
    art: 'https://ia801307.us.archive.org/31/items/mbid-42764450-04e5-459e-b022-00847fc8fb94/mbid-42764450-04e5-459e-b022-00847fc8fb94-12391862253_thumb250.jpg',
    preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
  };

  constructor(public navCtrl: NavController, public musicControls:MusicControls,
  public audioProvider: AudioProvider) {}

  play() {
    this.audioProvider.play(this.track.src);
    this.createControls();
  }

  pause() {
    this.audioProvider.pause();
    this.musicControls.updateIsPlaying(false);
  }

  createControls() {
    this.musicControls.create({
      track       : this.track.title,
      artist      : this.track.artist, 
      cover       : this.track.art, 
      isPlaying   : true, 
      hasPrev     : false,
      hasNext     : false,
      dismissable : true,    
    });

    this.musicControls.subscribe().subscribe(action => {
      const message = JSON.parse(action).message;
      switch(message) {
        case 'music-controls-play':
          this.play();
        break;

        case 'music-controls-pause':
          this.pause();
        break;
      }
    });

    this.musicControls.listen();
  }
}
