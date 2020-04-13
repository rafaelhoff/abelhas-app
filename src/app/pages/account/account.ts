import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModalPage } from '../../auth/changePassword/changePassword';
import { PhotoService, CameraPhoto } from 'src/app/providers/photo.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalsService } from 'src/app/shared/modals.service';


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
    private modalService: ModalsService,
    public photoService: PhotoService,
    public router: Router,
    public userDataService: UserDataService,
    public translateService: TranslateService
  ) { }

  readonly = true;
  accountData: UserLoginParams;
  myform: FormGroup;

  ngOnInit(): void {
    this.userDataService.getUser().then(d => {
      this.accountData = d;
      this.formInit();
    });
  }

  private formInit() {
    this.myform = new FormGroup({
      name: new FormControl(this.accountData.attributes.name),
      family_name: new FormControl(this.accountData.attributes.family_name),
    });
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

    try {
      this.accountData.attributes.picture = photo.webPath;
      this.userDataService.save(this.accountData);
    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);
    }
  }

  async takePicture() {
    // TODO: deal with the Picture.
    const photo: CameraPhoto = await this.photoService.capturePhoto();
    // const photo: Photo = await this.photoService.savePicture(camPhoto, 'profile.jpg');

    try {
      this.accountData.attributes.picture = photo.webPath;
      this.userDataService.save(this.accountData);
    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);
    }
  }

  switchEdit() {
    try {
      // Saving...
      if (!this.readonly && this.myform.valid) {
        this.accountData.attributes.name = this.myform.value.name;
        this.accountData.attributes.family_name = this.myform.value.family_name;

        this.userDataService.save(this.accountData);
      }
    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);
    }
    this.readonly = !this.readonly;
  }

  cancelChanges() {
    this.myform.reset();
    this.formInit();
    this.readonly = !this.readonly;
  }
}
