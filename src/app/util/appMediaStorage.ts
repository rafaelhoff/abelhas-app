import { Injectable } from '@angular/core';
import { Auth, Storage as S3Storage } from 'aws-amplify';
import { Plugins, CameraPhoto } from '@capacitor/core';
const { } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppMediaStorage {

  async saveAudioToS3(audio: HTMLAudioElement, id: string) {
    if (audio) {
      const blob = await fetch(audio.src).then(r => r.blob());
      await S3Storage.put(id, blob);
    }
  }

  async getAudioFromS3(id: string) {
    const audio: any = await S3Storage.get(id);
    return audio;
  }

  async download(id: string) {
    const audio: any = await S3Storage.get(id, { download: true });
    return audio;
  }

  // async getProfilePictureFromS3(username: string) {
  //   const key: string = username + '/profilePic.jpg';
  //   const profilePic: any = await Storage.get(key);

  //   // Write the file to the data directory
  //   await Filesystem.writeFile({
  //     path: fileName,
  //     data: base64Data,
  //     directory: FilesystemDirectory.Data
  //   });

  //   return profilePic;
  // }

  async savePictureToS3(photo: CameraPhoto, username: string, picName?: string) {
    if (photo) {

      if (!picName) {
        picName = (new Date().toISOString());
      }

      const blob = await fetch(photo.webPath).then(r => r.blob());
      const key = `${username}/${picName}`;
      await S3Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }
  }
}
