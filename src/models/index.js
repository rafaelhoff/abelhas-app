// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ActivityType = {
  "PHOTO": "photo",
  "TEXT": "text",
  "AUDIO": "audio"
};

const LoggerLevel = {
  "WARN": "warn",
  "ERROR": "error"
};

const { Apiary, Hive, Logger, HiveActivity } = initSchema(schema);

export {
  Apiary,
  Hive,
  Logger,
  ActivityType,
  LoggerLevel,
  HiveActivity
};