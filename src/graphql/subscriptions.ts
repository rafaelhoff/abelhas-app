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
      activities {
        type
        createdAt
        message
        s3ID
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
      activities {
        type
        createdAt
        message
        s3ID
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
      activities {
        type
        createdAt
        message
        s3ID
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
export const onCreateHive = /* GraphQL */ `
  subscription OnCreateHive($owner: String!) {
    onCreateHive(owner: $owner) {
      id
      apiaryID
      name
      longitude
      latitude
      favorite
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
      apiaryID
      name
      longitude
      latitude
      favorite
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
      apiaryID
      name
      longitude
      latitude
      favorite
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
