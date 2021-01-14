import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GalleryService } from 'src/app/providers/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { ModalsService } from 'src/app/shared/modals.service';
import { CameraPhoto } from 'src/app/providers/photo.service';
import { AppLogger } from 'src/app/util/appLogger';
import { AppMediaStorage } from 'src/app/util/appMediaStorage';
import { Apiary, HiveActivity, ActivityType } from 'src/models';
import { AudioRecord } from 'src/app/shared/recordAudio.component';

@Component({
  selector: 'app-apiary-activity',
  templateUrl: 'activity.html'
})
export class ApiaryActivityPage implements OnInit {

  constructor(
    private apiaryDataService: ApiaryDataService,
    private activatedRoute: ActivatedRoute,
    public galleryService: GalleryService,
    private actionSheetController: ActionSheetController,
    private modalService: ModalsService,
    private logger: AppLogger,
    private appMediaStorage: AppMediaStorage
  ) { }

  apiaryData: Apiary;
  apiaryId = '';
  defaultHref = '';

  ngOnInit() {
    this.galleryService.loadSaved();
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
  }

  ionViewWillEnter() {
    this.apiaryId = this.activatedRoute.snapshot.parent.parent.paramMap.get('apiaryId');
    if (this.apiaryId) {
      this.apiaryDataService.get(this.apiaryId).then((data: Apiary) => {
        this.apiaryData = data;
      });
    }
  }

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.galleryService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  public async addPicture() {
    const actionSheet = await this.modalService.createPictureActionSheet(async (photo: CameraPhoto) => {
      // TODO: validate what happens when user cancels.
      if (photo == null) {
        return;
      }

      try {
        // TODO: upload new picture to S3.
      } catch (error) {
        this.modalService.createCognitoErrorAlert(error);
      }

    });
    await actionSheet.present();
  }

  public async uploadFile(event) {
    try {
      const file: File = event.file;
      const id = await this.appMediaStorage.putFile(file);

      const newActivity: HiveActivity = {
        type: ActivityType.PHOTO,
        createdAt: new Date().toISOString(),
        s3ID: id
      };

      this.apiaryData = await this.addNewActivity(newActivity);

    } catch (error) {
      this.logger.error(error);
    }
  }

  public async addAudio(event) {
    return null;
  }

  public async newRecord(audio: AudioRecord) {
    try {
      if (audio) {
        audio.audio.play();
      }
      const id: string = await this.appMediaStorage.putAudio(audio);

      const newActivity: HiveActivity = {
        type: ActivityType.AUDIO,
        createdAt: new Date().toISOString(),
        s3ID: id
      };

      this.apiaryData = await this.addNewActivity(newActivity);

    } catch (error) {
      this.logger.error(error);
    }
  }

  private async addNewActivity(newActivity: HiveActivity) {
    let activities = [];
    if (this.apiaryData.activities) {
      activities = this.apiaryData.activities;
    }

    return this.apiaryDataService.update(this.apiaryData.id, { activities: activities.concat([newActivity]) });
  }

  async play(activity: HiveActivity) {
    const audio: AudioRecord = await this.appMediaStorage.getAudio(activity.s3ID);
    if (audio) {
      audio.audio.play();
    }
  }

  async presentPic(activity: HiveActivity) {
    const blob: any = await this.appMediaStorage.download(activity.s3ID);
  }
}
