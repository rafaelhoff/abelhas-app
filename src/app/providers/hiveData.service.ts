import { Injectable } from '@angular/core';

import { DataStore } from '@aws-amplify/datastore';
import { Hive } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class HiveDataService {

  public async getAll(): Promise<Hive[]> {
    const result: Hive[] = await DataStore.query<Hive>(Hive);

    return result;
  }

  public async getAllByApiary(apiaryId: string): Promise<Hive[]> {
    const result: Hive[] = (await DataStore.query(Hive)).filter(c => c.apiary.id === apiaryId);
    return result;
  }

  async get(id: string): Promise<Hive> {
    const result: Hive = await DataStore.query<Hive>(Hive, id);
    return result;
  }

  public async create(newObj: Hive): Promise<Hive> {
    const created: Hive = await DataStore.save<Hive>(new Hive({
      name: newObj.name,
      apiary: newObj.apiary,
      latitude: newObj.latitude,
      longitude: newObj.longitude,
      favorite: false
    }));

    return created;
  }

  public async update(id: string, dataToUpdate: any): Promise<Hive> {
    const original = await this.get(id);

    const updatedObj: Hive = await DataStore.save(
      Hive.copyOf(original, updated => {
        Object.keys(dataToUpdate).forEach(key => {
          updated[key] = dataToUpdate[key];
        });
      })
    );
    return updatedObj;
  }
}
