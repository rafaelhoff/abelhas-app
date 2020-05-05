/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncApiaries = /* GraphQL */ `
  query SyncApiaries(
    $filter: ModelApiaryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncApiaries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        address
        type
        forages
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getApiary = /* GraphQL */ `
  query GetApiary($id: ID!) {
    getApiary(id: $id) {
      id
      name
      address
      type
      hives {
        nextToken
        startedAt
      }
      forages
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listApiarys = /* GraphQL */ `
  query ListApiarys(
    $filter: ModelApiaryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApiarys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        type
        forages
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHives = /* GraphQL */ `
  query SyncHives(
    $filter: ModelHiveFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHives(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getHive = /* GraphQL */ `
  query GetHive($id: ID!) {
    getHive(id: $id) {
      id
      name
      apiary {
        id
        name
        address
        type
        forages
        _version
        _deleted
        _lastChangedAt
        owner
      }
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listHives = /* GraphQL */ `
  query ListHives(
    $filter: ModelHiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
