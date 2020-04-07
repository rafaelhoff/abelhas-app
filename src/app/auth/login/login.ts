import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Modals } = Plugins;

import { UserDataService, UserLoginParams } from '../../providers/UserData.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  credentials: UserLoginParams = { username: '', password: '' };

  constructor(
    public userDataService: UserDataService,
    public router: Router
  ) { }

  async onLogin(form: NgForm) {

    try {
      await this.userDataService.login(this.credentials);
      this.router.navigateByUrl('/app');
    } catch (error) {
      // TODO: show error...
      console.log(error);
      let alertRet = await Modals.alert({
        title: 'Error',
        message: error.message
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
