import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../providers/photo.service';
import { GalleryService } from 'src/app/providers/gallery.service';

@Component({
  selector: 'app-picture',
  templateUrl: 'picture.page.html'
})
export class PicturePage implements OnInit {

  constructor(
    public galleryService: GalleryService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.galleryService.loadSaved();
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
}
