import { Injectable } from '@angular/core';
import { AppStorage } from '../util/storage';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  readonly storageKey = 'username';
  readonly HAS_LOGGED_IN = 'hasLoggedIn';

  favorites: string[] = [];
  public userData: UserData = null;

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

  async login(username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    this.userData = {
      username,
      // TODO: change the avatar code.
      avatarPath: '/assets/img/profile.png',
    };
    this.save();

    return window.dispatchEvent(new CustomEvent('user:login'));
  }

  async signup(username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    this.userData = {
      username,
      // TODO: change the avatar code.
      avatarPath: '/assets/img/profile.png',
    };
    this.save();
    return window.dispatchEvent(new CustomEvent('user:signup'));
  }

  async logout(): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, null);
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

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  async changePassword(options: ChangePasswordOptions): Promise<boolean> {
    // TODO: do the actual change.
    return true;
  }

}

export interface ChangePasswordOptions {
  oldPassword: string;
  password: string;
  password2: string;
}

export interface UserData {
  username: string;
  avatarPath: string;
}


export interface UserOptions {
  username: string;
  password: string;
}


