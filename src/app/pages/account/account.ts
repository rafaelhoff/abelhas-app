import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

import { UserDataService } from '../../providers/userData.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModalPage } from '../../auth/changePassword/changePassword';
import { PhotoService, CameraPhoto } from 'src/app/providers/photo.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public photoService: PhotoService,
    public router: Router,
    public userDataService: UserDataService,
    public translateService: TranslateService
  ) { }

  readonly = true;

  ngOnInit(): void {
    this.userDataService.getUser(); // .then(d => console.log(JSON.stringify(d)));
  }

  async updatePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('account.chgpic'),
      buttons: [{
        text: this.translateService.instant('account.takePhoto'),
        icon: 'share',
        handler: async () => {
          this.takePicture();
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
            this.userDataService.userData.username = data.username;
            this.userDataService.save();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.userDataService.userData.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async changePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordModalPage
    });
    return await modal.present();
  }

  async logout() {
    await this.userDataService.logout();
  }

  async getPhoto() {
    const photo: CameraPhoto = await this.photoService.getFromLibrary();
    this.userDataService.userData.attributes.picture = photo.webPath;
    this.userDataService.save();
  }

  async takePicture() {
    // TODO: deal with the Picture.
    const photo: CameraPhoto = await this.photoService.capturePhoto();
    // const photo: Photo = await this.photoService.savePicture(camPhoto, 'profile.jpg');

    this.userDataService.userData.attributes.picture = photo.webPath;
    this.userDataService.save();

  }

  switchEdit() {
    // TODO: fix the form
    if (!this.readonly) {
      console.log('saved.');
    }
    this.readonly = !this.readonly;
  }

  cancelChanges() {
    this.readonly = !this.readonly;
  }
}
