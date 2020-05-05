# Ionic Angular Conference Application

This application is purely a kitchen-sink demo of the Ionic Framework and Angular.

**There is not an actual Ionic Conference at this time.** This project is just to show off Ionic components in a real-world application. Please go through the steps in [CONTRIBUTING](https://github.com/ionic-team/ionic-conference-app/blob/master/.github/CONTRIBUTING.md) before submitting an issue.


## Table of Contents
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [App Preview](#app-preview)
- [Deploying](#deploying)
  - [Progressive Web App](#progressive-web-app)
  - [Android](#android)
  - [iOS](#ios)


## Getting Started

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/ionic-team/ionic-conference-app.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Profit. :tada:

_Note: See [How to Prevent Permissions Errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions) if you are running into issues when trying to install packages globally._

## Contributing

See [CONTRIBUTING.md](https://github.com/ionic-team/ionic-conference-app/blob/master/.github/CONTRIBUTING.md) :tada::+1:


## App Preview

### [Menu](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/menu/menu.html)

| Material Design                                          | iOS                                              |
|----------------------------------------------------------|--------------------------------------------------|
| ![Android Menu](/resources/screenshots/android-menu.png) | ![iOS Menu](/resources/screenshots/ios-menu.png) |


### [Schedule Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/schedule/schedule.html)

| Material Design                                                  | iOS                                                      |
|------------------------------------------------------------------|----------------------------------------------------------|
| ![Android Schedule](/resources/screenshots/android-schedule.png) | ![iOS Schedule](/resources/screenshots/ios-schedule.png) |

### [Speakers Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/speaker-list/speaker-list.html)

| Material Design                                                  | iOS                                                      |
|------------------------------------------------------------------|----------------------------------------------------------|
| ![Android Speakers](/resources/screenshots/android-speakers.png) | ![iOS Speakers](/resources/screenshots/ios-speakers.png) |

### [Speaker Detail Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/speaker-detail/speaker-detail.html)

| Material Design                                                              | iOS                                                                  |
|------------------------------------------------------------------------------|----------------------------------------------------------------------|
| ![Android Speaker Detail](/resources/screenshots/android-speaker-detail.png) | ![iOS Speaker Detail](/resources/screenshots/ios-speaker-detail.png) |

### [About Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/pages/about/about.html)

| Material Design                                            | iOS                                                |
|------------------------------------------------------------|----------------------------------------------------|
| ![Android About](/resources/screenshots/android-about.png) | ![iOS About](/resources/screenshots/ios-about.png) |


## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `npm run ionic:build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`


## TODO:

[ ] Fix Orientation of Pictures: https://github.com/ionic-team/capacitor/issues/307
[X] Add AWS Cognito: 
  - https://aws.amazon.com/blogs/mobile/user-sign-in-and-sign-up-for-ionic-mobile-apps-with-amazon-cognito/
  - https://github.com/awslabs/aws-mobile-ionic-sample
[ ] Voice Recording
  - Offer Pull Request? To Web Environment?
  - https://bitbucket.org/tchvu3/capacitor-voice-recorder/src/master/
[ ] Add Angular Animations
  - https://angular.io/guide/animations
  - https://medium.com/ngconf/animating-angulars-ngif-and-ngfor-32a6ff26ed2d
[ ] Fix Geolocation Problem
[ ] Rename Amplify abelhas2 to something meaningful.
[ ] Disabled Apiary Form not working correctly.


## Good Links

- Angular Forms: https://codecraft.tv/courses/angular/forms/template-driven/

## Local Environment

https://github.com/aaronshaf/dynamodb-admin
https://www.gravitywell.co.uk/insights/how-to-use-your-mocked-dynamodb-with-appsync-and-lambda/

```
npm install -g dynamodb-admin
DYNAMO_ENDPOINT=http://localhost:62224 AWS_REGION=us-fake-1 AWS_ACCESS_KEY_ID=fake AWS_SECRET_ACCESS_KEY=fake dynamodb-admin
```

Issues around mocking DataStore:
https://github.com/aws-amplify/amplify-js/issues/5241

