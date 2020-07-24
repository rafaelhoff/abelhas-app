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
