import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto as CameraPhotoCapacitor, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // API Documentation: https://capacitor.ionicframework.com/docs/apis/camera/

  constructor(
    private platform: Platform) { }

  public async capturePhoto(): Promise<CameraPhoto> {
    // Take a photo
    const capturedPhoto: CameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100),
      // correctOrientation: false,
      height: 200,
      width: 200
    });

    return capturedPhoto;
  }

  public async getFromLibrary(): Promise<CameraPhoto> {
    const photo: CameraPhoto = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });

    return photo;
  }

  // Save picture to file on device
  public async savePicture(cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Get platform-specific photo filepaths
    return await this.getPhotoFile(cameraPhoto, fileName);
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      // TODO: validate this tslint
      // tslint:disable-next-line: no-non-null-assertion
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Retrieve the photo metadata based on the platform the app is running on
  private async getPhotoFile(cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> {
    if (this.platform.is('hybrid')) {
      // Get the new, complete filepath of the photo saved on filesystem
      const fileUri = await Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: fileName
      });

      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: fileUri.uri,
        webviewPath: Capacitor.convertFileSrc(fileUri.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  async readBase64Photo(filepath: string): Promise<string> {
    const readFile = await Filesystem.readFile({
      path: filepath,
      directory: FilesystemDirectory.Data
    });

    // Web platform only: Save the photo into the base64 field
    return `data:image/jpeg;base64,${readFile.data}`;
  }
}

export interface CameraPhoto extends CameraPhotoCapacitor {

}

export interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
