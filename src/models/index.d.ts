import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Apiary {
  readonly id: string;
  readonly name: string;
  readonly name_casei: string;
  readonly address?: string;
  readonly type?: string;
  readonly hives?: Hive[];
  readonly forages: string[];
  readonly favorite: boolean;
  constructor(init: ModelInit<Apiary>);
  static copyOf(source: Apiary, mutator: (draft: MutableModel<Apiary>) => MutableModel<Apiary> | void): Apiary;
}

export declare class Hive {
  readonly id: string;
  readonly name: string;
  readonly apiary: Apiary;
  readonly longitude?: number;
  readonly latitude?: number;
  constructor(init: ModelInit<Hive>);
  static copyOf(source: Hive, mutator: (draft: MutableModel<Hive>) => MutableModel<Hive> | void): Hive;
}