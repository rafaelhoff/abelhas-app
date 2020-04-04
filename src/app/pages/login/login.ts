import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService, UserOptions } from '../../providers/user-data';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  credentials: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userDataService: UserDataService,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    try {
      if (form.valid) {
        this.userDataService.login(this.credentials);
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    } catch (error) {
      // TODO: show error...
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
