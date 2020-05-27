import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  Plugins,
  CameraResultType,
  CameraSource,
  FilesystemDirectory
} from '@capacitor/core';
import { AppLogger } from 'src/app/util/appLogger';

const { Filesystem } = Plugins;

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  image: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private logger: AppLogger
  ) { }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad CameraPage');
  }

  async getPhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async getFromPhotos() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takePictureScaled() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
      width: 128
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takePictureCorrected() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
      width: 128,
      correctOrientation: true
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takePictureFile() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);


    const imageData = await Filesystem.readFile({
      path: image.path
    });

    await Filesystem.writeFile({
      path: 'cool-photo.jpg',
      directory: FilesystemDirectory.Data,
      data: imageData.data
    });

    const stat = await Plugins.Filesystem.stat({
      path: 'cool-photo.jpg',
      directory: FilesystemDirectory.Data
    });

    this.logger.log(stat);

    // this.image = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + imageData.data);
    const imageUrl = image.webPath;
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  getCapacitorPath(url: string) {
    return url.replace('file://', '_capacitor_');
  }

  async testImageSize() {
    const image = await Plugins.Camera.getPhoto({
      allowEditing: false,
      correctOrientation: false,
      height: 1080,
      width: 1080,
      quality: 90,
      resultType: CameraResultType.DataUrl,
      saveToGallery: false
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async testAndroidBreak() {
    const image = await Plugins.Camera.getPhoto({
      allowEditing: false,
      correctOrientation: true, // <------------ oups
      height: 1080,
      width: 1080,
      quality: 90,
      resultType: CameraResultType.DataUrl,
      saveToGallery: false,
      source: CameraSource.Photos
    });
    this.logger.log('Got image back', image.path, image.webPath, image.format, image.exif);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
}
