import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quote:any = {};
  isAvailable: Boolean;
  constructor(public navCtrl: NavController, 
    private faio: FingerprintAIO,
    private http: HttpClient,
    private platform: Platform) {

  }

  ionViewDidLoad() {
    this.checkAvailablity();
  }

  checkAvailablity() {
    this.platform.ready()
    .then(()=> {
      this.faio.isAvailable().then((value)=> {
        console.log(value);
        this.isAvailable = true
      }).catch(() => {
        this.isAvailable = false;
      });
    });
  }

  authenticate() {
    this.faio.show({
      clientId: 'Ionic Fingerprint Auth',
      clientSecret: 'password', //Only necessary for Android
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
    .then((result: any) => {
      this.reveal();
    });
  }

  reveal() {
    const url = "http://api.icndb.com/jokes/random/";
    this.http.get(url)
    .subscribe((data:any) => {
      this.quote = data.value;
    });
  }

}
