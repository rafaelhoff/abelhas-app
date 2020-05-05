// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Apiary, Hive } = initSchema(schema);

export {
  Apiary,
  Hive
};