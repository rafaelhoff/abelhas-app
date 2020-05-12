import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppStorage {
  async get(key: string): Promise<any> {
    const res: any = await Storage.get({ key });
    if (!res || !res.value) {
      return null;
    }
    return JSON.parse(res.value);
  }

  async set(key: string, value: any): Promise<void> {
    return Storage.set({ key, value: JSON.stringify(value) });
  }
}

export const StorageKeys = {
  configuration: 'configuration',
  photos: 'photos',
  username: 'username'
};
