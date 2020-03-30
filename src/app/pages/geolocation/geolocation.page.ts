import { Component, NgZone } from '@angular/core';
import {
  Plugins,
  CallbackID
} from '@capacitor/core';
import { NGXLogger } from 'ngx-logger';

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

  constructor(
    private logger: NGXLogger,
    private zone: NgZone) {
  }

  async requestPermissions() {
    const permResult = await Plugins.Geolocation.requestPermissions();
    this.logger.log('Perm request result: ', permResult);
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      this.logger.log('Current', coordinates);
      this.zone.run(() => {
        this.singleCoords = coordinates.coords;
      });
    } catch (e) {
      alert('WebView geo error');
      this.logger.error(e);
    }
  }

  watchPosition() {
    try {
      this.watchId = Plugins.Geolocation.watchPosition({}, (position, err) => {
        this.logger.log('Watch', position);
        this.zone.run(() => {
          this.watchCoords = position.coords;
        });
      });

      this.logger.log('Got watch', this.watchId);
    } catch (e) {
      alert('WebView geo error');
      this.logger.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Plugins.Geolocation.clearWatch({ id: this.watchId });
    }
  }

}
