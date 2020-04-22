import { Injectable } from '@angular/core';
import { DeviceInfo, Device } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AppPlatform {

  async isWeb(): Promise<boolean> {
    const info: DeviceInfo = await Device.getInfo();
    return (info.platform === 'web');
  }
}

