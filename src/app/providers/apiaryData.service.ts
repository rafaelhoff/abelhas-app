import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDataService } from './userData.service';
import { environment } from 'src/environments/environment';
import { DataStore } from '@aws-amplify/datastore';
import { Apiary } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ApiaryDataService {
  mockData: Apiary[];

  constructor(
    public http: HttpClient,
    public user: UserDataService
  ) { }

  load(): Observable<Apiary[]> {
    if (environment.mockData) {
      if (this.mockData) {
        return of(this.mockData);
      } else {
        return this.http
          .get('assets/data/apiary.json')
          .pipe(map(this.processData, this));
      }
    } else {
      return from(DataStore.query<Apiary>(Apiary))
        .pipe(map(this.processData, this));
      // return from(this.appStorage.get(StorageKeys.apiaries))
      //   .pipe(map(this.processData, this));
    }
  }

  processData(data: any): Apiary[] {
    if (environment.mockData) {
      this.mockData = data;
    }

    // SO FAR, not needed.

    return data;
  }

  getApiaries(
    queryText = '',
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

  async get(id: string): Promise<Apiary> {
    const result: Apiary = await DataStore.query<Apiary>(Apiary, id);
    return result;
  }

  public async create(newApiary: Apiary): Promise<Apiary> {
    // TODO: add a validation - if mock or not

    const created: Apiary = await DataStore.save<Apiary>(new Apiary({
      hives: [],
      name: newApiary.name,
      address: newApiary.address,
      forages: newApiary.forages,
      type: newApiary.type
    }));

    return created;
  }

  public async update(id: string, dataToUpdate: any) {
    const original = await DataStore.query<Apiary>(Apiary, id);

    await DataStore.save(
      Apiary.copyOf(original, updated => {
        Object.keys(dataToUpdate).forEach(key => {
          updated[key] = dataToUpdate[key];
        });
      })
    );
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
