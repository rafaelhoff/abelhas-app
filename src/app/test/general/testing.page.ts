import { Component, NgZone } from '@angular/core';
import {
  Plugins,
  CallbackID
} from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { Hive } from 'src/models';
import { HiveDataService } from 'src/app/providers/hiveData.service';
import { AppLogger } from 'src/app/util/appLogger';
import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-testing',
  templateUrl: 'testing.page.html'
})
export class TestingPage {

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
    private logger: AppLogger,
    private zone: NgZone,
    public http: HttpClient,
    private apiaryDataService: ApiaryDataService,
    private hiveDataService: HiveDataService,
    private actionSheetController: ActionSheetController,
    public barcodeScanner: BarcodeScanner
  ) {
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


  async insertMock() {
    return this.http.get('assets/test/apiary-mock.json').subscribe({
      next: (data: any) => {
        const apiaries: Promise<any>[] = [];

        data.apiary.forEach(async a => {
          apiaries.push(this.apiaryDataService.create(a));
        });

        Promise.all(apiaries).then(objs => {
          data.hive.forEach(async h => {
            h.apiary = objs[h.apiary];
            h.latitude = null;
            h.longitude = null;
            const r: Hive = await this.hiveDataService.create(h);
          });
        });

        this.logger.log('done');
      }
    });

  }

  // TEST-QR
  // Example found here: https://enappd.com/blog/ionic-4-qr-code-barcode-scanning/82/

  public async testQR() {
    try {
      const options: BarcodeScannerOptions = {
        preferFrontCamera: false,
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false,
        prompt: 'Place a barcode inside the scan area',
        resultDisplayDuration: 500,
        formats: 'QR_CODE ',
        // orientation: 'landscape',
      };

      const barcodeData: BarcodeScanResult = await this.barcodeScanner.scan(options);
      this.logger.log('Barcode data', JSON.stringify(barcodeData));
    } catch (error) {
      this.logger.log('Error is', error);
    }
    return true;
  }

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // ..
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

}
