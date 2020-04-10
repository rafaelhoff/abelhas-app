import { Injectable } from '@angular/core';
import { AppStorage } from '../util/storage';
import { Auth } from 'aws-amplify';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { AppLogger } from '../util/logger';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  readonly storageKey = 'username';

  favorites: string[] = [];
  public userData: UserData = null;
  private cognitoUser: CognitoUser;

  constructor(
    private logger: AppLogger,
    public storage: AppStorage
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

    if (environment.connectToCognito) {
      this.cognitoUser = await Auth.signIn(user);
      this.logger.trace(this.cognitoUser);
    } else {
      this.logger.debug('skipping Cognito');
    }

    // TODO: read the avatarpicture and download it.

    this.userData = {
      username: user.username,
      // TODO: change the avatar code.
      avatarPath: '/assets/img/profile.png',
    };
    this.save();

    return window.dispatchEvent(new CustomEvent('user:login'));
  }

  async signup(user: UserLoginParams): Promise<any> {

    if (environment.connectToCognito) {
      const signUpData: ISignUpResult = await Auth.signUp(user);
      this.logger.trace(signUpData);
    } else {
      this.logger.debug('skipping Cognito');
    }

    return true;
  }

  async confirmCode(username: string, code: string): Promise<boolean> {
    if (environment.connectToCognito) {
      await Auth.confirmSignUp(username, code);
    } else {
      this.logger.debug('skipping Cognito');
    }

    this.userData = {
      username,
      // TODO: change the avatar code.
      avatarPath: '/assets/img/profile.png',
    };
    this.save();
    return window.dispatchEvent(new CustomEvent('user:signup'));
  }

  async logout(): Promise<any> {
    if (environment.connectToCognito) {
      await Auth.signOut();
    } else {
      this.logger.debug('skipping Cognito');
    }

    await this.storage.set(this.storageKey, null);

    window.dispatchEvent(new CustomEvent('user:logout'));
    return true;
  }

  save(): Promise<any> {
    return this.storage.set(this.storageKey, this.userData);
  }

  async getUser(): Promise<UserData> {
    if (!this.userData) {
      this.userData = await this.storage.get(this.storageKey);
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
      this.logger.debug('skipping Cognito');
    }

    return true;
  }

  async forgotPassword(username: string): Promise<any> {
    if (environment.connectToCognito) {
      await Auth.forgotPassword(username);
    } else {
      this.logger.debug('skipping Cognito');
    }

    return true;
  }

  async confirmCodePassword(username: string, code: string, password: string): Promise<boolean> {
    if (environment.connectToCognito) {
      await Auth.forgotPasswordSubmit(username, code, password);
    } else {
      this.logger.debug('skipping Cognito');
    }

    return true;
  }
}

export interface ChangePasswordOptions {
  oldPassword: string;
  newPassword: string;
  newPasswordRep: string;
}

export interface UserData {
  username: string;
  avatarPath: string;
}


export interface UserLoginParams {
  username: string;
  password: string;
  attributes?: object;
}

