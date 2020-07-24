/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApiary = /* GraphQL */ `
  subscription OnCreateApiary($owner: String!) {
    onCreateApiary(owner: $owner) {
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
export const onUpdateApiary = /* GraphQL */ `
  subscription OnUpdateApiary($owner: String!) {
    onUpdateApiary(owner: $owner) {
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
export const onDeleteApiary = /* GraphQL */ `
  subscription OnDeleteApiary($owner: String!) {
    onDeleteApiary(owner: $owner) {
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
export const onCreateHive = /* GraphQL */ `
  subscription OnCreateHive($owner: String!) {
    onCreateHive(owner: $owner) {
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
export const onUpdateHive = /* GraphQL */ `
  subscription OnUpdateHive($owner: String!) {
    onUpdateHive(owner: $owner) {
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
export const onDeleteHive = /* GraphQL */ `
  subscription OnDeleteHive($owner: String!) {
    onDeleteHive(owner: $owner) {
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
export const onCreateHiveActivity = /* GraphQL */ `
  subscription OnCreateHiveActivity($owner: String!) {
    onCreateHiveActivity(owner: $owner) {
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
export const onUpdateHiveActivity = /* GraphQL */ `
  subscription OnUpdateHiveActivity($owner: String!) {
    onUpdateHiveActivity(owner: $owner) {
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
export const onDeleteHiveActivity = /* GraphQL */ `
  subscription OnDeleteHiveActivity($owner: String!) {
    onDeleteHiveActivity(owner: $owner) {
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
export const onCreateLogger = /* GraphQL */ `
  subscription OnCreateLogger($owner: String!) {
    onCreateLogger(owner: $owner) {
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
export const onUpdateLogger = /* GraphQL */ `
  subscription OnUpdateLogger($owner: String!) {
    onUpdateLogger(owner: $owner) {
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
export const onDeleteLogger = /* GraphQL */ `
  subscription OnDeleteLogger($owner: String!) {
    onDeleteLogger(owner: $owner) {
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
