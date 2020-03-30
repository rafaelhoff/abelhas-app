import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AppStorage } from '../util/storage';

import { Plugins, DeviceLanguageCodeResult } from '@capacitor/core';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  preSetData: any;
  data: any;

  private darkModeSource = new Subject<boolean>();
  darkMode$ = this.darkModeSource.asObservable();

  constructor(
    public http: HttpClient,
    public storage: AppStorage,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
  }

  async getInitialConfiguation(): Promise<any> {
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

  loadPreData(): any {
    if (this.preSetData) {
      return of(this.preSetData);
    } else {
      return this.http
        .get('assets/data/config.json')
        .pipe(map(this.processPreData, this));
    }
  }

  private processPreData(data: any) {
    this.preSetData = data;
    return this.preSetData;
  }

  async load(): Promise<any> {
    if (!this.data) {
      // First-time load.
      this.data = await this.storage.get('configuration');
      if (!this.data) {
        this.data = await this.getInitialConfiguation();
      }
      this.updateAppLanguage();
      this.updateDarkMode();
    }
    return this.data;
  }

  async save(newData: any): Promise<any> {
    const result = await this.storage.set('configuration', newData);
    this.data = newData;
    return result;
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
