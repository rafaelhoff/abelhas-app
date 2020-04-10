import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-cameraQR',
  templateUrl: 'cameraQR.page.html',
  styleUrls: ['cameraQR.page.scss']
})
export class CameraQRPage {
  // Example found here: https://enappd.com/blog/ionic-4-qr-code-barcode-scanning/82/

  constructor(
    private actionSheetController: ActionSheetController,
    public barcodeScanner: BarcodeScanner,
    private logger: NGXLogger
  ) { }

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