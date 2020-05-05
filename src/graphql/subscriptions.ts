/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApiary = /* GraphQL */ `
  subscription OnCreateApiary($owner: String!) {
    onCreateApiary(owner: $owner) {
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
export const onUpdateApiary = /* GraphQL */ `
  subscription OnUpdateApiary($owner: String!) {
    onUpdateApiary(owner: $owner) {
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
export const onDeleteApiary = /* GraphQL */ `
  subscription OnDeleteApiary($owner: String!) {
    onDeleteApiary(owner: $owner) {
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
export const onCreateHive = /* GraphQL */ `
  subscription OnCreateHive($owner: String!) {
    onCreateHive(owner: $owner) {
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
export const onUpdateHive = /* GraphQL */ `
  subscription OnUpdateHive($owner: String!) {
    onUpdateHive(owner: $owner) {
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
export const onDeleteHive = /* GraphQL */ `
  subscription OnDeleteHive($owner: String!) {
    onDeleteHive(owner: $owner) {
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
