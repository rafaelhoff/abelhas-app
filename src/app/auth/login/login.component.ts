import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Modals } = Plugins;

import { UserDataService, UserLoginParams } from '../../providers/userData.service';


@Component({
  selector: 'pm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  credentials: UserLoginParams = { username: '', password: '' };

  constructor(
    public userDataService: UserDataService,
    public router: Router
  ) { }

  async onLogin(form: NgForm) {

    try {
      await this.userDataService.login(this.credentials);
      this.router.navigateByUrl('/app/tabs/schedule');
    } catch (error) {
      // TODO: show error...
      console.log(error);
      const alertRet = await Modals.alert({
        title: 'Error',
        message: error.message
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  forgotPassword() {
    console.log('forgot');
  }
}
