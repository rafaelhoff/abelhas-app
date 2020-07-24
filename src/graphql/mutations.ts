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
export const updateApiary = /* GraphQL */ `
  mutation UpdateApiary(
    $input: UpdateApiaryInput!
    $condition: ModelApiaryConditionInput
  ) {
    updateApiary(input: $input, condition: $condition) {
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
export const deleteApiary = /* GraphQL */ `
  mutation DeleteApiary(
    $input: DeleteApiaryInput!
    $condition: ModelApiaryConditionInput
  ) {
    deleteApiary(input: $input, condition: $condition) {
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
export const createHiveActivity = /* GraphQL */ `
  mutation CreateHiveActivity(
    $input: CreateHiveActivityInput!
    $condition: ModelHiveActivityConditionInput
  ) {
    createHiveActivity(input: $input, condition: $condition) {
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
export const updateHiveActivity = /* GraphQL */ `
  mutation UpdateHiveActivity(
    $input: UpdateHiveActivityInput!
    $condition: ModelHiveActivityConditionInput
  ) {
    updateHiveActivity(input: $input, condition: $condition) {
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
export const deleteHiveActivity = /* GraphQL */ `
  mutation DeleteHiveActivity(
    $input: DeleteHiveActivityInput!
    $condition: ModelHiveActivityConditionInput
  ) {
    deleteHiveActivity(input: $input, condition: $condition) {
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
export const createLogger = /* GraphQL */ `
  mutation CreateLogger(
    $input: CreateLoggerInput!
    $condition: ModelLoggerConditionInput
  ) {
    createLogger(input: $input, condition: $condition) {
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
export const updateLogger = /* GraphQL */ `
  mutation UpdateLogger(
    $input: UpdateLoggerInput!
    $condition: ModelLoggerConditionInput
  ) {
    updateLogger(input: $input, condition: $condition) {
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
export const deleteLogger = /* GraphQL */ `
  mutation DeleteLogger(
    $input: DeleteLoggerInput!
    $condition: ModelLoggerConditionInput
  ) {
    deleteLogger(input: $input, condition: $condition) {
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
