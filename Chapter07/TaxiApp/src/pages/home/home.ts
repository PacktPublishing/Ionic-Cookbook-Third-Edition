import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map: GoogleMap;
  public mapRendered: Boolean = false;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform.ready().then(() => {
      this.showMap();
    });
  }

 
  showMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');
      this.mapRendered = true;
    });
  }

  getMyLocation() {
    this.map.getMyLocation().then((location) => {
      var msg = ["I am here:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng].join("\n");
      let position = {
        target: location.latLng,
        zoom: 15
      };
      this.map.moveCamera(position);
      let markerOptions: MarkerOptions = {
        'position': location.latLng,
        'title': msg
      };
      this.map.addMarker(markerOptions).then((marker:Marker) => {
        marker.showInfoWindow();
      });
    });
  }
}
