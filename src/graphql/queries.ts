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
        name_casei
        address
        type
        forages
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
      name_casei
      address
      type
      hives {
        nextToken
        startedAt
      }
      forages
      favorite
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        name_casei
        address
        type
        forages
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
        longitude
        latitude
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
        name_casei
        address
        type
        forages
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      longitude
      latitude
      favorite
      activities {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        longitude
        latitude
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHiveActivities = /* GraphQL */ `
  query SyncHiveActivities(
    $filter: ModelHiveActivityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHiveActivities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getHiveActivity = /* GraphQL */ `
  query GetHiveActivity($id: ID!) {
    getHiveActivity(id: $id) {
      id
      message
      hive {
        id
        name
        longitude
        latitude
        favorite
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listHiveActivitys = /* GraphQL */ `
  query ListHiveActivitys(
    $filter: ModelHiveActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHiveActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLoggers = /* GraphQL */ `
  query SyncLoggers(
    $filter: ModelLoggerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLoggers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        level
        message
        stack
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getLogger = /* GraphQL */ `
  query GetLogger($id: ID!) {
    getLogger(id: $id) {
      id
      level
      message
      stack
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLoggers = /* GraphQL */ `
  query ListLoggers(
    $filter: ModelLoggerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoggers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        level
        message
        stack
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
