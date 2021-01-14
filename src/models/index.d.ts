import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ActivityType {
  PHOTO = "photo",
  TEXT = "text",
  AUDIO = "audio"
}

export enum LoggerLevel {
  WARN = "warn",
  ERROR = "error"
}

export declare class HiveActivity {
  readonly type: ActivityType | keyof typeof ActivityType;
  readonly createdAt: string;
  readonly message?: string;
  readonly s3ID?: string;
  constructor(init: ModelInit<HiveActivity>);
}

export declare class Apiary {
  readonly id: string;
  readonly name: string;
  readonly name_casei: string;
  readonly address?: string;
  readonly type?: string;
  readonly hives?: Hive[];
  readonly forages: string[];
  readonly favorite: boolean;
  readonly activities?: HiveActivity[];
  constructor(init: ModelInit<Apiary>);
  static copyOf(source: Apiary, mutator: (draft: MutableModel<Apiary>) => MutableModel<Apiary> | void): Apiary;
}

export declare class Hive {
  readonly id: string;
  readonly name: string;
  readonly longitude?: number;
  readonly latitude?: number;
  readonly favorite: boolean;
  readonly apiary: Apiary;
  constructor(init: ModelInit<Hive>);
  static copyOf(source: Hive, mutator: (draft: MutableModel<Hive>) => MutableModel<Hive> | void): Hive;
}

export declare class Logger {
  readonly id: string;
  readonly level: LoggerLevel | keyof typeof LoggerLevel;
  readonly message: string;
  readonly stack: string;
  constructor(init: ModelInit<Logger>);
  static copyOf(source: Logger, mutator: (draft: MutableModel<Logger>) => MutableModel<Logger> | void): Logger;
}