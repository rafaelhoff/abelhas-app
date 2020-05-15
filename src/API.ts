/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateApiaryInput = {
  id?: string | null,
  name: string,
  name_casei: string,
  address?: string | null,
  type?: string | null,
  forages: Array< string | null >,
  favorite: boolean,
  _version?: number | null,
};

export type ModelApiaryConditionInput = {
  name?: ModelStringInput | null,
  name_casei?: ModelStringInput | null,
  address?: ModelStringInput | null,
  type?: ModelStringInput | null,
  forages?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  and?: Array< ModelApiaryConditionInput | null > | null,
  or?: Array< ModelApiaryConditionInput | null > | null,
  not?: ModelApiaryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateApiaryInput = {
  id: string,
  name?: string | null,
  name_casei?: string | null,
  address?: string | null,
  type?: string | null,
  forages?: Array< string | null > | null,
  favorite?: boolean | null,
  _version?: number | null,
};

export type DeleteApiaryInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreateHiveInput = {
  id?: string | null,
  name: string,
  apiary: ApiaryInput,
  longitude?: number | null,
  latitude?: number | null,
  _version?: number | null,
  hiveApiaryId: string,
};

export type ApiaryInput = {
  id: string,
  name: string,
  name_casei: string,
  address?: string | null,
  type?: string | null,
  forages: Array< string | null >,
  favorite: boolean,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelHiveConditionInput = {
  name?: ModelStringInput | null,
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  and?: Array< ModelHiveConditionInput | null > | null,
  or?: Array< ModelHiveConditionInput | null > | null,
  not?: ModelHiveConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateHiveInput = {
  id: string,
  name?: string | null,
  apiary?: ApiaryInput | null,
  longitude?: number | null,
  latitude?: number | null,
  _version?: number | null,
  hiveApiaryId?: string | null,
};

export type DeleteHiveInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelApiaryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  name_casei?: ModelStringInput | null,
  address?: ModelStringInput | null,
  type?: ModelStringInput | null,
  forages?: ModelStringInput | null,
  favorite?: ModelBooleanInput | null,
  and?: Array< ModelApiaryFilterInput | null > | null,
  or?: Array< ModelApiaryFilterInput | null > | null,
  not?: ModelApiaryFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelHiveFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  and?: Array< ModelHiveFilterInput | null > | null,
  or?: Array< ModelHiveFilterInput | null > | null,
  not?: ModelHiveFilterInput | null,
};

export type CreateApiaryMutationVariables = {
  input: CreateApiaryInput,
  condition?: ModelApiaryConditionInput | null,
};

export type CreateApiaryMutation = {
  createApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type UpdateApiaryMutationVariables = {
  input: UpdateApiaryInput,
  condition?: ModelApiaryConditionInput | null,
};

export type UpdateApiaryMutation = {
  updateApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type DeleteApiaryMutationVariables = {
  input: DeleteApiaryInput,
  condition?: ModelApiaryConditionInput | null,
};

export type DeleteApiaryMutation = {
  deleteApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type CreateHiveMutationVariables = {
  input: CreateHiveInput,
  condition?: ModelHiveConditionInput | null,
};

export type CreateHiveMutation = {
  createHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type UpdateHiveMutationVariables = {
  input: UpdateHiveInput,
  condition?: ModelHiveConditionInput | null,
};

export type UpdateHiveMutation = {
  updateHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type DeleteHiveMutationVariables = {
  input: DeleteHiveInput,
  condition?: ModelHiveConditionInput | null,
};

export type DeleteHiveMutation = {
  deleteHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type SyncApiariesQueryVariables = {
  filter?: ModelApiaryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncApiariesQuery = {
  syncApiaries:  {
    __typename: "ModelApiaryConnection",
    items:  Array< {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetApiaryQueryVariables = {
  id: string,
};

export type GetApiaryQuery = {
  getApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type ListApiarysQueryVariables = {
  filter?: ModelApiaryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApiarysQuery = {
  listApiarys:  {
    __typename: "ModelApiaryConnection",
    items:  Array< {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncHivesQueryVariables = {
  filter?: ModelHiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncHivesQuery = {
  syncHives:  {
    __typename: "ModelHiveConnection",
    items:  Array< {
      __typename: "Hive",
      id: string,
      name: string,
      longitude: number | null,
      latitude: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetHiveQueryVariables = {
  id: string,
};

export type GetHiveQuery = {
  getHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type ListHivesQueryVariables = {
  filter?: ModelHiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHivesQuery = {
  listHives:  {
    __typename: "ModelHiveConnection",
    items:  Array< {
      __typename: "Hive",
      id: string,
      name: string,
      longitude: number | null,
      latitude: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateApiarySubscriptionVariables = {
  owner: string,
};

export type OnCreateApiarySubscription = {
  onCreateApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnUpdateApiarySubscriptionVariables = {
  owner: string,
};

export type OnUpdateApiarySubscription = {
  onUpdateApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnDeleteApiarySubscriptionVariables = {
  owner: string,
};

export type OnDeleteApiarySubscription = {
  onDeleteApiary:  {
    __typename: "Apiary",
    id: string,
    name: string,
    name_casei: string,
    address: string | null,
    type: string | null,
    hives:  {
      __typename: "ModelHiveConnection",
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    forages: Array< string | null >,
    favorite: boolean,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnCreateHiveSubscriptionVariables = {
  owner: string,
};

export type OnCreateHiveSubscription = {
  onCreateHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnUpdateHiveSubscriptionVariables = {
  owner: string,
};

export type OnUpdateHiveSubscription = {
  onUpdateHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnDeleteHiveSubscriptionVariables = {
  owner: string,
};

export type OnDeleteHiveSubscription = {
  onDeleteHive:  {
    __typename: "Hive",
    id: string,
    name: string,
    apiary:  {
      __typename: "Apiary",
      id: string,
      name: string,
      name_casei: string,
      address: string | null,
      type: string | null,
      forages: Array< string | null >,
      favorite: boolean,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    },
    longitude: number | null,
    latitude: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};
