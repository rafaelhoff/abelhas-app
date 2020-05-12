import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { UserDataService } from './userData.service';
import { DataStore } from '@aws-amplify/datastore';
import { Apiary } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ApiaryDataService {

  constructor(
    private user: UserDataService
  ) { }

  private process(apiaries: Apiary[]) {
    const resultP: any[] = [];

    const sortF = ((a, b) => {
      const nameA = a.type.toUpperCase(); // ignore upper and lowercase
      const nameB = b.type.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    apiaries.forEach(a => {
      const found = resultP.find(e => e.type === a.type);
      if (found) {
        found.apiaries.push(a);
      } else {
        resultP.push({
          type: a.type,
          apiaries: [a]
        });
      }
    });
    return {
      groups: resultP.sort(sortF),
      apiaries
    };
  }

  public async getApiaries(queryText = null): Promise<any> {
    const apiaries: Apiary[] = (queryText == null) ?
      await DataStore.query<Apiary>(Apiary) :
      await DataStore.query(Apiary, c => c.name_casei('contains', queryText.toLowerCase()));

    return this.process(apiaries);
  }

  public async getFavorites(): Promise<any> {
    const apiaries = await DataStore.query(Apiary, c => c.favorite('eq', true));
    return this.process(apiaries);
  }

  async get(id: string): Promise<Apiary> {
    const result: Apiary = await DataStore.query<Apiary>(Apiary, id);
    return result;
  }

  public async create(newApiary: Apiary): Promise<Apiary> {
    const created: Apiary = await DataStore.save<Apiary>(new Apiary({
      hives: [],
      name: newApiary.name,
      name_casei: newApiary.name.toLowerCase(),
      address: newApiary.address,
      forages: newApiary.forages,
      type: newApiary.type,
      favorite: newApiary.favorite
    }));

    return created;
  }

  public async update(id: string, dataToUpdate: any): Promise<Apiary> {
    const original = await this.get(id);

    const updatedObj: Apiary = await DataStore.save(
      Apiary.copyOf(original, updated => {
        Object.keys(dataToUpdate).forEach(key => {
          updated[key] = dataToUpdate[key];
          if (key === 'name') {
            updated.name_casei = (dataToUpdate[key] as string).toLowerCase();
          }
        });
      })
    );
    return updatedObj;
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
