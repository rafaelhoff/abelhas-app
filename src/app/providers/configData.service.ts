import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AppStorage, StorageKeys } from '../util/appStorage';

import { Plugins, DeviceLanguageCodeResult } from '@capacitor/core';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {
  preSetData: PresetConfigData;
  data: ConfigData;

  private darkModeSource = new Subject<boolean>();
  darkMode$ = this.darkModeSource.asObservable();

  constructor(
    public http: HttpClient,
    public storage: AppStorage,
    private translate: TranslateService,
  ) { }

  async getInitialConfiguation(): Promise<ConfigData> {
    const langRes: DeviceLanguageCodeResult = await Device.getLanguageCode();
    let lang = 'en';
    lang = langRes.value.startsWith('pt') ? 'pt' : lang;
    lang = langRes.value.startsWith('es') ? 'es' : lang;

    return {
      darkMode: false,
      language: lang,
      tutorialDone: false
    };
  }

  loadPreData(): Observable<PresetConfigData> {
    if (this.preSetData) {
      return of(this.preSetData);
    } else {
      return this.http
        .get('assets/data/config.json')
        .pipe(map(this.processPreData, this));
    }
  }

  private processPreData(data: PresetConfigData) {
    this.preSetData = data;
    return this.preSetData;
  }

  async load(): Promise<ConfigData> {
    if (!this.data) {
      // First-time load.
      this.data = await this.storage.get(StorageKeys.configuration);
      if (!this.data) {
        this.data = await this.getInitialConfiguation();
      }
      this.updateAppLanguage();
      this.updateDarkMode();
    }
    return this.data;
  }

  async save(newData: any): Promise<void> {
    await this.storage.set(StorageKeys.configuration, newData);
    this.data = newData;
    return;
  }

  setDarkMode(darkMode: boolean) {
    this.data.darkMode = darkMode;
    this.save(this.data);
    this.updateDarkMode();
  }

  setLanguage(language: string) {
    this.data.language = language;
    this.save(this.data);
    this.updateAppLanguage();
  }

  private updateDarkMode() {
    this.darkModeSource.next(this.data.darkMode);
  }

  private updateAppLanguage() {
    this.translate.use(this.data.language);
  }

  setTutorialDone(tutorialDone: boolean) {
    this.data.tutorialDone = tutorialDone;
    this.save(this.data);
  }

  async isTutorialDone() {
    await this.load();
    return this.data.tutorialDone;
  }
}

export interface ConfigData {
  darkMode: boolean;
  language: string;
  tutorialDone: boolean;
}

export interface PresetConfigData {
  languages: string[];
}
