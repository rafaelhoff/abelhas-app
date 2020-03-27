import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  preSetData: any;

  private darkModeSource = new Subject<boolean>();
  darkMode$ = this.darkModeSource.asObservable();

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) { }

  load(): any {
    if (this.preSetData) {
      return of(this.preSetData);
    } else {
      return this.http
        .get('assets/data/config.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    this.preSetData = data;
    return this.preSetData;
  }

  setDarkMode(darkMode: boolean) {
    this.darkModeSource.next(darkMode);
  }

}
