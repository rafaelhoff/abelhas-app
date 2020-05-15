import { Plugins } from '@capacitor/core';
const { FilesystemDirectory, Filesystem } = Plugins;

import { Injectable } from '@angular/core';
import { PhotoService, CameraPhoto } from './photo.service';
import { AppStorage, StorageKeys } from '../util/appStorage';
import { AppMediaStorage } from '../util/appMediaStorage';
import { AppPlatform } from '../util/appPlatform';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public photos: CameraPhoto[] = [];
  isWeb = false;

  constructor(
    private appPlatform: AppPlatform,
    private appStorage: AppStorage,
    private appMediaStorage: AppMediaStorage,
    private photoService: PhotoService
  ) {
    appPlatform.isWeb().then(w => this.isWeb = w);
  }

  // Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera

  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem

  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage

  public async addNewToGallery() {

    const capturedPhoto: CameraPhoto = await this.photoService.capturePhoto();
    // TODO: fix the username;
    this.appMediaStorage.savePictureToS3(capturedPhoto, 'rafael.hoff@gmail.com');

    // Add new photo to Photos array
    this.photos.unshift(capturedPhoto);

    // Cache all photo data for future retrieval
    this.appStorage.set(StorageKeys.photos,
      this.isWeb
        ? JSON.stringify(this.photos)
        : JSON.stringify(this.photos.map(p => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.base64String;

          return photoCopy;
        }))
    );
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: CameraPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    this.appStorage.set(StorageKeys.photos, this.photos);

    // delete photo file from filesystem
    await Filesystem.deleteFile({
      path: photo.path,
      directory: FilesystemDirectory.Data
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await this.appStorage.get(StorageKeys.photos);

    // If running on the web...
    if (this.isWeb) {
      // Display the photo by reading into base64 format
      for (const photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        photo.base64String = await this.photoService.readBase64Photo(photo.path);
      }
    }
  }
}
