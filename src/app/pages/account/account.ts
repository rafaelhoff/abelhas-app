import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

import { UserDataService } from '../../providers/user-data';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModalPage } from './chgPwd/account.chgPwd';
import { PhotoService, Photo } from 'src/app/providers/photo.service';
import { PhotoLibraryModalPage } from './photoLibrary/account.photoLibrary';
import { CameraPhoto } from '@capacitor/core';

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

  ngOnInit(): void {
    this.userDataService.getUser();
  }

  async updatePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('account.chgpic'),
      buttons: [{
        text: this.translateService.instant('account.takePhoto'),
        icon: 'share',
        handler: async () => {
          // TODO: deal with the Picture.
          const camPhoto: CameraPhoto = await this.photoService.capturePhoto();
          const photo: Photo = await this.photoService.savePicture(camPhoto, 'profile.jpg');

          // this.userDataService.userData.avatarPath = await this.photoService.readBase64Photo(photo.filepath);
          this.userDataService.userData.avatarPath = photo.webviewPath;
          // Web platform only: Save the photo into the base64 field
          this.userDataService.save();
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

  logout() {
    this.userDataService.logout();
    this.router.navigateByUrl('/login');
  }

  async getPhoto() {
    const modal = await this.modalController.create({
      component: PhotoLibraryModalPage
    });
    return await modal.present();
  }
}
