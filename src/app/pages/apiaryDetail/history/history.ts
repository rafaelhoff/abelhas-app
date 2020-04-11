import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GalleryService } from 'src/app/providers/gallery.service';

@Component({
  selector: 'app-picture',
  templateUrl: 'history.html'
})
export class ApiaryHistoryPage implements OnInit {

  constructor(
    public galleryService: GalleryService,
    public actionSheetController: ActionSheetController
  ) { }

  defaultHref = '';

  ngOnInit() {
    this.galleryService.loadSaved();
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
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
