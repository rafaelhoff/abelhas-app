import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordModalPage } from '../../auth/changePassword/changePassword';
import { PhotoService, CameraPhoto } from 'src/app/providers/photo.service';
import { NgForm } from '@angular/forms';
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
  model: { name: string; family_name: string; username: string; picture: string; };
  @ViewChild('accountForm') accountForm: NgForm;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.userDataService.getUser().then(d => this.model = {
      name: d.attributes.name,
      family_name: d.attributes.family_name,
      username: d.username,
      picture: d.attributes.picture
    });
  }

  async updatePicture() {

    const actionSheet = await this.modalService.createPictureActionSheet(async (isCapture: boolean) => {
      // TODO: deal with the Picture.
      const photo: CameraPhoto = (isCapture) ?
        await this.photoService.capturePhoto() :
        await this.photoService.getFromLibrary();

      // TODO: validate what happens when user cancels.
      if (photo == null) {
        return;
      }

      try {
        await this.userDataService.setCustomProfilePic(photo);
        // TODO: fix in case of changes in the name / family_name;
        this.initForm();
      } catch (error) {
        this.modalService.createCognitoErrorAlert(error);
      }

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

  async switchEdit() {
    try {
      // Saving...
      if (!this.readonly && this.accountForm.valid) {
        const userData: UserLoginParams = await this.userDataService.getUser();
        userData.attributes.name = this.accountForm.value.name;
        userData.attributes.family_name = this.accountForm.value.family_name;

        this.userDataService.save(userData);
      }
    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);
    }
    this.readonly = !this.readonly;
  }

  async cancelChanges() {
    this.initForm();
    this.readonly = !this.readonly;
  }
}
