import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModalPage } from './chgPwd/account.chgPwd';
import { PhotoService } from 'src/app/providers/photo.service';
import { PhotoLibraryModalPage } from './photoLibrary/account.photoLibrary';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  user: any;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public photoService: PhotoService,
    public router: Router,
    public userData: UserData,
    public translateService: TranslateService
  ) { }

  ngAfterViewInit() {
    this.getUser();
  }

  async updatePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('account.chgpic'),
      buttons: [{
        text: this.translateService.instant('account.takePhoto'),
        icon: 'share',
        handler: () => {
          // TODO: deal with the Picture.
          this.photoService.addNewToGallery();
        }
      }, {
        text: this.translateService.instant('account.fromLibrary'),
        icon: 'arrow-dropright-circle',
        handler: () => {
          this.getPhoto();
        }
      }, {
        text: this.translateService.instant('basic.cancel'),
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUser();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.user.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async getUser() {
    this.user = await this.userData.getUser();
  }

  async changePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordModalPage
    });
    return await modal.present();
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  async getPhoto() {
    const modal = await this.modalController.create({
      component: PhotoLibraryModalPage
    });
    return await modal.present();
  }
}
