import { Injectable } from '@angular/core';
import { AppStorage } from '../util/storage';
import { Auth } from 'aws-amplify';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  readonly storageKey = 'username';

  favorites: string[] = [];
  public userData: UserData = null;
  private cognitoUser: CognitoUser;

  constructor(
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

    this.cognitoUser = await Auth.signIn(user);
    console.log(this.cognitoUser);

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

    const signUpData: ISignUpResult = await Auth.signUp(user);
    console.log(signUpData);

    this.userData = {
      username: user.username,
      // TODO: change the avatar code.
      avatarPath: '/assets/img/profile.png',
    };
    this.save();
    return window.dispatchEvent(new CustomEvent('user:signup'));
  }

  async logout(): Promise<any> {
    await Auth.signOut();
    await this.storage.set(this.storageKey, null);

    window.dispatchEvent(new CustomEvent('user:logout'));
    return true;
  }

  private save(): Promise<any> {
    return this.storage.set(this.storageKey, this.userData);
  }

  async getUser(): Promise<UserData> {
    if (!this.userData) {
      this.userData = await this.storage.get(this.storageKey);
    }
    return this.userData;
  }

  isLoggedIn(): boolean {
    return (this.userData != null);
  }

  async changePassword(options: ChangePasswordOptions): Promise<boolean> {
    await Auth.changePassword(this.cognitoUser, options.oldPassword, options.newPpassword);

    return true;
  }

}

export interface ChangePasswordOptions {
  oldPassword: string;
  newPpassword: string;
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

