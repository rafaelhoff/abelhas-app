import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDataService } from './userData.service';
import { environment } from 'src/environments/environment';
import { AppStorage, StorageKeys } from '../util/appStorage';

@Injectable({
  providedIn: 'root'
})
export class ApiaryDataService {
  data: ApiaryInfo[];

  constructor(
    public appStorage: AppStorage,
    public http: HttpClient,
    public user: UserDataService
  ) { }

  load(): Observable<ApiaryInfo[]> {
    if (this.data) {
      return of(this.data);
    } else {
      if (environment.mockData) {
        return this.http
          .get('assets/data/apiary.json')
          .pipe(map(this.processData, this));
      } else {
        return from(this.appStorage.get(StorageKeys.apiaries))
          .pipe(map(this.processData, this));
      }
    }
  }

  processData(data: any): ApiaryInfo[] {
    this.data = data;

    // SO FAR, not needed.

    return this.data;
  }

  getApiaries(
    dayIndex?: number,
  ) {
    return this.load().pipe(
      map((data: any) => {
        return {
          groups: [{
            name: 'Group 01',
            apiaries: data
          }],
          apiaries: data
        };
      })
    );
  }

  get(id: string): Observable<ApiaryInfo> {
    return this.load().pipe(
      map((apiaries: any) => {
        for (const apiary of apiaries) {
          if (apiary._id === id) {
            return apiary;
          }
        }
        return null;
      })
    );
  }

  public async saveNew(newApiary: ApiaryInfo): Promise<any> {
    // TODO: add a validation - if mock or not
    newApiary._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    newApiary.hives = 0;
    this.data.push(newApiary);
    return true;
  }

  // TODO: delete this method.
  getMap() {
    return of([
      {
        name: 'Monona Terrace Convention Center',
        lat: 43.071584,
        lng: -89.38012,
        center: true
      },
      {
        name: 'Ionic HQ',
        lat: 43.074395,
        lng: -89.381056
      },
      {
        name: 'Afterparty - Brocach Irish Pub',
        lat: 43.07336,
        lng: -89.38335
      }
    ]);
  }
}

export interface ApiaryInfo {
  _id: string;
  name: string;
  address: string;
  forages: string[];
  type: string;
  hives: number;
}
