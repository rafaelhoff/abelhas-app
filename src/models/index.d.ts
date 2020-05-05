import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Apiary {
  readonly id: string;
  readonly name: string;
  readonly address?: string;
  readonly type?: string;
  readonly hives?: Hive[];
  readonly forages: string[];
  constructor(init: ModelInit<Apiary>);
  static copyOf(source: Apiary, mutator: (draft: MutableModel<Apiary>) => MutableModel<Apiary> | void): Apiary;
}

export declare class Hive {
  readonly id: string;
  readonly name: string;
  readonly apiary: Apiary;
  constructor(init: ModelInit<Hive>);
  static copyOf(source: Hive, mutator: (draft: MutableModel<Hive>) => MutableModel<Hive> | void): Hive;
}