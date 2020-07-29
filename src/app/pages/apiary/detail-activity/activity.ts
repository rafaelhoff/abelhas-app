import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GalleryService } from 'src/app/providers/gallery.service';
import { Apiary } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { ModalsService } from 'src/app/shared/modals.service';
import { CameraPhoto } from 'src/app/providers/photo.service';
import { AppLogger } from 'src/app/util/appLogger';

@Component({
  selector: 'app-apiary-activity',
  templateUrl: 'activity.html'
})
export class ApiaryActivityPage implements OnInit {

  constructor(
    private apiaryDataService: ApiaryDataService,
    private activatedRoute: ActivatedRoute,
    private galleryService: GalleryService,
    private actionSheetController: ActionSheetController,
    private modalService: ModalsService,
    private logger: AppLogger
  ) { }

  apiaryData: Apiary;
  apiaryId = '';
  defaultHref = '';

  activities = [
    {
      type: 'photo',
      message: 'somethign',
      s3ID: 'asd'
    },
    {
      type: 'photo',
      message: 'somethign',
      s3ID: 'asd'
    }
  ];

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

  uploadFile(event) {
    const fileName = event.fileName;
    this.logger.trace(`The file "${fileName}" has been selected.`);
    // nothign
  }
}
