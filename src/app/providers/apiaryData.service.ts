import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { DataStore } from '@aws-amplify/datastore';
import { Apiary, Hive } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ApiaryDataService {

  constructor() {
    // const subscription = DataStore.observe(Apiary).subscribe(msg => {
    //   console.log('subscription: apiary');
    //   console.log(msg.model, msg.opType, msg.element);
    // });
  }

  private process(apiaries: Apiary[]): ApiaryResults {
    const resultP: any[] = [];

    const sortF = ((a, b) => {
      const nameA = a.type.toUpperCase(); // ignore upper and lowercase
      const nameB = b.type.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        console.log('ad');
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

  public async getApiaries(queryText = null): Promise<ApiaryResults> {
    const apiaries: Apiary[] = (queryText == null) ?
      await DataStore.query(Apiary) :
      await DataStore.query(Apiary, c => c.name_casei('contains', queryText.toLowerCase()));

    return this.process(apiaries);
  }

  public async getFavorites(): Promise<any> {
    const apiaries = await DataStore.query(Apiary, c => c.favorite('eq', true));
    return this.process(apiaries);
  }

  async get(id: string): Promise<Apiary> {
    const result: Apiary = await DataStore.query(Apiary, id);
    return result;
  }

  public async create(newApiary: Apiary): Promise<Apiary> {
    const objApiary: any = Object.assign({}, newApiary);
    objApiary.name_casei = newApiary.name.toLowerCase();
    objApiary.hives = [];

    const created: Apiary = await DataStore.save<Apiary>(new Apiary(objApiary));
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

export interface ApiaryResults {
  groups: {
    type: string;
    apiaries: Apiary[];
  }[];
  apiaries: Apiary[];
}
