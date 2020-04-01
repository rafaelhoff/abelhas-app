import { Plugins } from '@capacitor/core';
const { FilesystemDirectory, Filesystem } = Plugins;

import { Injectable } from '@angular/core';
import { PhotoService, Photo } from './photo.service';
import { Platform } from '@ionic/angular';
import { AppStorage } from '../util/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE = 'photos';

  constructor(
    private appStorage: AppStorage,
    private platform: Platform,
    private photoService: PhotoService) {
  }

  // Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera

  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem

  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage

  public async addNewToGallery() {

    const capturedPhoto = await this.photoService.capturePhoto();
    const fileName = new Date().getTime() + '.jpeg';
    const savedImageFile = await this.photoService.savePicture(capturedPhoto, fileName);

    // Add new photo to Photos array
    this.photos.unshift(savedImageFile);

    // Cache all photo data for future retrieval
    this.appStorage.set(this.PHOTO_STORAGE,
      this.platform.is('hybrid')
        ? JSON.stringify(this.photos)
        : JSON.stringify(this.photos.map(p => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.base64;

          return photoCopy;
        }))
    );
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    this.appStorage.set(this.PHOTO_STORAGE, JSON.stringify(this.photos));

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await this.appStorage.get(this.PHOTO_STORAGE);
    this.photos = JSON.parse(photos) || [];

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (const photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        photo.base64 = await this.photoService.readBase64Photo(photo.filepath);
      }
    }
  }
}
