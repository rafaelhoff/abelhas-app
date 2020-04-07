import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService, UserLoginParams } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserLoginParams = { username: '', password: '' };

  constructor(
    public router: Router,
    public userDataService: UserDataService
  ) { }

  async onSignup(form: NgForm) {

    try {
      await this.userDataService.signup(this.signup);
      this.router.navigateByUrl('/app/tabs/schedule');
    } catch (error) {
      // TODO: fix the error
      console.log(error);
    }
  }

  openTermsConditions() {
    // TODO: fix the terms and conditions
    console.log('opened');
  }
}
