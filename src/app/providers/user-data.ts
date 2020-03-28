import { Injectable } from '@angular/core';
import { AppStorage } from '../util/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  readonly storageKey = 'username';
  readonly HAS_LOGGED_IN = 'hasLoggedIn';

  favorites: string[] = [];

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

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  async logout(): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, null);
    await this.storage.set(this.storageKey, null);

    window.dispatchEvent(new CustomEvent('user:logout'));
    return true;
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set(this.storageKey, username);
  }

  getUsername(): Promise<string> {
    return this.storage.get(this.storageKey).then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

}
