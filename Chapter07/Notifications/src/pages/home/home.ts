import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifications:Array<any> = [];
  id: number = 1;
  message:string;
  time:number;
  constructor(public navCtrl: NavController,
    private localNotifications: LocalNotifications) {
  }

  showNotification(type) {
    if(type === 'now') {
      this.localNotifications.schedule({
        id: this.id,
        text: this.message,
      });
    } else {
      this.localNotifications.schedule({
        id: this.id,
        text: this.message,
        at: new Date(new Date().getTime() + this.time * 100),
      });
    }
    this.id++;
  }

  clearNotifications() {
    this.localNotifications.clearAll();
  }

}
