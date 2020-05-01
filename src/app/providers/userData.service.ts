import { Injectable } from '@angular/core';
import { AppStorage, StorageKeys } from '../util/appStorage';
import { Auth } from 'aws-amplify';
import { ISignUpResult, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { AppLogger } from '../util/appLogger';
import { AppMediaStorage } from '../util/appMediaStorage';
import { CameraPhoto } from './photo.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  favorites: string[] = [];
  private userData: UserLoginParams = null;
  private cognitoUser: CognitoUser;

  constructor(
    private logger: AppLogger,
    private storage: AppStorage,
    private appMediaStorage: AppMediaStorage
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  async login(user: UserLoginParams): Promise<any> {
    let attributesObj = { name: '', family_name: '', picture: '', locale: '' };

    if (environment.connectToCognito) {
      this.cognitoUser = await Auth.signIn(user);
      this.logger.trace(this.cognitoUser);

      const attributes: CognitoUserAttribute[] = await this.readCognitoUserAttributes(this.cognitoUser);
      attributes.forEach(element => {
        attributesObj[element.getName()] = element.getValue();
      });

      if (attributesObj.picture !== environment.defaultPicture) {
        this.getCustomProfilePic();
      }

    } else {
      this.logger.debug('skipping Cognito: login');
      attributesObj = { name: 'John', family_name: 'Doe', picture: environment.defaultPicture, locale: 'en' };
    }

    this.save({
      username: user.username,
      password: null,
      attributes: attributesObj
    }, false);

    return window.dispatchEvent(new CustomEvent('user:login'));
  }

  private readCognitoUserAttributes(cognitoUser: CognitoUser): Promise<CognitoUserAttribute[]> {
    return new Promise((resolve, reject) => {
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  async signUp(user: UserLoginParams): Promise<any> {

    if (environment.connectToCognito) {
      const signUpData: ISignUpResult = await Auth.signUp(user);
      this.logger.trace(signUpData);
    } else {
      this.logger.debug('skipping Cognito: signUp');
    }

    return true;
  }

  async confirmCodeSignUp(user: UserLoginParams, code: string): Promise<boolean> {
    if (environment.connectToCognito) {
      await Auth.confirmSignUp(user.username, code);
    } else {
      this.logger.debug('skipping Cognito: confirmCodeSignUp');
    }

    return this.login(user);
  }

  async resendConfirmCodeSignUp(user: UserLoginParams): Promise<any> {
    if (environment.connectToCognito) {
      await Auth.resendSignUp(user.username);
    } else {
      this.logger.debug('skipping Cognito: confirmCodeSignUp');
    }

    return true;
  }

  async logout(): Promise<any> {
    if (environment.connectToCognito) {
      await Auth.signOut();
    } else {
      this.logger.debug('skipping Cognito: logout');
    }

    await this.storage.set(StorageKeys.username, null);

    window.dispatchEvent(new CustomEvent('user:logout'));
    return true;
  }

  async save(newData: UserLoginParams, updateExternal: boolean = true): Promise<any> {
    if (environment.connectToCognito) {
      if (updateExternal) {
        // // window.LOG_LEVEL = 'DEBUG';
        // const session = await Auth.currentSession();
        // this.logger.debug(JSON.stringify(session));

        const resultCog: string = await Auth.updateUserAttributes(this.cognitoUser, newData.attributes);
        this.logger.trace(resultCog);
      }
    } else {
      this.logger.debug('skipping Cognito: updateUserAttributes');
    }

    await this.storage.set(StorageKeys.username, newData);
    this.userData = newData;
    return true;
  }

  async getUser(): Promise<UserLoginParams> {
    if (!this.userData) {
      this.userData = await this.storage.get(StorageKeys.username);
    }
    return this.userData;
  }

  async isLoggedIn(): Promise<boolean> {
    await this.getUser();
    return (this.userData != null);
  }

  async changePassword(options: ChangePasswordOptions): Promise<boolean> {
    if (environment.connectToCognito) {
      await Auth.changePassword(this.cognitoUser, options.oldPassword, options.newPassword);
    } else {
      this.logger.debug('skipping Cognito: changePassword');
    }

    return true;
  }

  async forgotPassword(username: string): Promise<any> {
    if (environment.connectToCognito) {
      await Auth.forgotPassword(username);
    } else {
      this.logger.debug('skipping Cognito: forgotPassword');
    }

    return true;
  }

  async confirmCodePassword(username: string, code: string, password: string): Promise<boolean> {
    if (environment.connectToCognito) {
      await Auth.forgotPasswordSubmit(username, code, password);
    } else {
      this.logger.debug('skipping Cognito: confirmCodePassword');
    }

    return true;
  }

  // TODO: read the avatarpicture and download it.
  async getCustomProfilePic() {
    // // 'customProfile.jpg'
    // this.appMediaStorage.getProfilePictureFromS3(user.username)
    //   .then(pic => {
    //     //this.storage.
    //   });

  }

  async setCustomProfilePic(photo: CameraPhoto) {
    this.userData.attributes.picture = photo.webPath;
    this.logger.debug('saving picture changes');
    await this.save(this.userData);

    if (environment.connectToS3) {
      this.logger.debug('uploading profile picture to S3');
      await this.appMediaStorage.savePictureToS3(photo, this.userData.username, 'customProfile.jpg');
    } else {
      this.logger.debug('skipping S3: setCustomProfilePic');
    }

  }
}

export interface ChangePasswordOptions {
  oldPassword: string;
  newPassword: string;
  newPasswordRep: string;
}

export interface UserLoginParams {
  username: string;
  password: string;
  attributes?: {
    name: string;
    family_name: string;
    picture: string;
    locale: string;
  };
}

