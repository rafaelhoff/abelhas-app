import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, FilesystemDirectory, CameraPhoto as CameraPhotoCapacitor, CameraSource } from '@capacitor/core';

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // API Documentation: https://capacitor.ionicframework.com/docs/apis/camera/

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

// tslint:disable-next-line: no-empty-interface
export interface CameraPhoto extends CameraPhotoCapacitor {

}
