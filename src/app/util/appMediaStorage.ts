import { Injectable } from '@angular/core';
import { Auth, Storage as S3Storage } from 'aws-amplify';
import { Plugins, CameraPhoto } from '@capacitor/core';
import { AudioRecord } from '../shared/recordAudio.component';
import { AppLogger } from './appLogger';
const { } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppMediaStorage {
  constructor(
    private logger: AppLogger
  ) { }

  async putAudio(audio: AudioRecord): Promise<string> {
    let id = null;
    if (audio) {
      id = audio.recordedAt.toISOString() + '.ogg';
      const blob = await fetch(audio.audio.src).then(r => r.blob());
      await S3Storage.put(id, blob, {
        level: 'private',
        contentType: 'application/ogg'
      });
    }
    return id;
  }

  async getAudio(id: string): Promise<AudioRecord> {
    const s3Obj: any = await S3Storage.get(id, { level: 'private', download: true });
    this.logger.trace(s3Obj);
    const audioUrl = URL.createObjectURL(s3Obj.Body);
    return {
      audio: new Audio(audioUrl),
      recordedAt: new Date()
    }
  }

  async putFile(file: File): Promise<string> {
    let id = null;
    if (file) {
      id = `${new Date().toISOString()}.jpg`;
      await S3Storage.put(id, file, {
        level: 'private'
      });
    }
    return id;
  }

  async download(id: string) {
    const result: any = await S3Storage.get(id, { level: 'private', download: true });
    this.logger.trace(result);
    return result;
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
