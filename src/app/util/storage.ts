import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
const { Storage } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class AppStorage {
    async get(key: string): Promise<any> {
        const res: any = await Storage.get({ key });
        return JSON.parse(res.value);
    }

    async set(key: string, value: any): Promise<void> {
        return Storage.set({ key, value });
    }
}
