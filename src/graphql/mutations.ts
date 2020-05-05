/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApiary = /* GraphQL */ `
  mutation CreateApiary(
    $input: CreateApiaryInput!
    $condition: ModelApiaryConditionInput
  ) {
    createApiary(input: $input, condition: $condition) {
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
export const updateApiary = /* GraphQL */ `
  mutation UpdateApiary(
    $input: UpdateApiaryInput!
    $condition: ModelApiaryConditionInput
  ) {
    updateApiary(input: $input, condition: $condition) {
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
export const deleteApiary = /* GraphQL */ `
  mutation DeleteApiary(
    $input: DeleteApiaryInput!
    $condition: ModelApiaryConditionInput
  ) {
    deleteApiary(input: $input, condition: $condition) {
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
export const createHive = /* GraphQL */ `
  mutation CreateHive(
    $input: CreateHiveInput!
    $condition: ModelHiveConditionInput
  ) {
    createHive(input: $input, condition: $condition) {
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
export const updateHive = /* GraphQL */ `
  mutation UpdateHive(
    $input: UpdateHiveInput!
    $condition: ModelHiveConditionInput
  ) {
    updateHive(input: $input, condition: $condition) {
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
export const deleteHive = /* GraphQL */ `
  mutation DeleteHive(
    $input: DeleteHiveInput!
    $condition: ModelHiveConditionInput
  ) {
    deleteHive(input: $input, condition: $condition) {
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
