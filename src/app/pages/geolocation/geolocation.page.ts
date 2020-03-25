import { Component, NgZone } from '@angular/core';
import {
  Plugins,
  CallbackID
} from '@capacitor/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: 'geolocation.page.html',
  styleUrls: ['geolocation.page.scss']
})
export class GeoLocationPage {

  singleCoords = {
    latitude: 0,
    longitude: 0
  };
  watchCoords = {
    latitude: 0,
    longitude: 0
  };

  watchId: CallbackID;

  constructor(private zone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeolocationPage');
  }

  async requestPermissions() {
    const permResult = await Plugins.Geolocation.requestPermissions();
    console.log('Perm request result: ', permResult);
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      this.zone.run(() => {
        this.singleCoords = coordinates.coords;
      });
    } catch (e) {
      alert('WebView geo error');
      console.error(e);
    }
  }

  watchPosition() {
    try {
      this.watchId = Plugins.Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', position);
        this.zone.run(() => {
          this.watchCoords = position.coords;
        });
      });

      console.log('Got watch', this.watchId);
    } catch (e) {
      alert('WebView geo error');
      console.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Plugins.Geolocation.clearWatch({ id: this.watchId });
    }
  }

}
