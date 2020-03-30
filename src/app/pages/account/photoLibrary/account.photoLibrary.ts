import { Component, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { LibraryItem, PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

// Example from: https://github.com/terikon/photo-library-demo-ionic2/tree/master/src/pages

@Component({
  selector: 'app-chgPwd',
  templateUrl: 'account.photoLibrary.html',
})
export class PhotoLibraryModalPage {
  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';

  library: LibraryItem[];

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private photoLibrary: PhotoLibrary,
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer
  ) {
    this.library = [];
    this.fetchPhotos();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async fetchPhotos() {

    this.library = [];

    try {
      await this.photoLibrary.requestAuthorization();
      const photolib = this.photoLibrary.getLibrary();
      if (!photolib) {
        console.warn("IonicNative PhotoLibrary: not available with this Device");
        return false;
      }

      photolib.subscribe((res: any) => {
        console.log('Library: ' + JSON.stringify(res));
        res.library.forEach(libraryItem => {
          const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(libraryItem.thumbnailURL);
          libraryItem.safeThumbnailURL = (url as string);

          console.log(JSON.stringify(libraryItem, null, '\t'));
        });
        this.library = this.library.concat(res.library);
        //this.library = this.library.slice(0, 9); // To take top 10 images
        this.cd.detectChanges();

        // error: err => { console.log('could not get photos'); },
        // complete: () => { console.log('done getting photos'); }
      });
    } catch (error) {
      console.log('permissions weren\'t granted');
    }

    return;

    this.photoLibrary.getLibrary(null, null, { thumbnailWidth: THUMBNAIL_WIDTH, thumbnailHeight: THUMBNAIL_HEIGHT/*, chunkTimeSec: 0.3*/ }).subscribe({
      next: (chunk) => {
        this.library = this.library.concat(chunk);
        //this.library = this.library.slice(0, 9); // To take top 10 images
        this.cd.detectChanges();
      },
      error: async (err: string) => {
        if (err.startsWith('Permission')) {

          // let permissionsModal = this.modalCtrl.create(PermissionsPage);
          // permissionsModal.onDidDismiss(() => {
          //   // retry
          //   this.fetchPhotos();
          // });
          // permissionsModal.present();

        } else { // Real error
          const toast = await this.toastCtrl.create({
            message: `getLibrary error: ${err}`,
            duration: 6000,
          });
          toast.present();
        }
      },
      complete: () => {
        // Library completely loaded
      }
    });

  }

  itemTapped(event, libraryItem) {
    // this.navCtrl.push(ItemDetailsPage, {
    //   libraryItem: libraryItem
    // });
  }

  trackById(index: number, libraryItem: LibraryItem): string { return libraryItem.id; }

  getSafeUrl(url) {
    const res: SafeUrl = url.startsWith('cdvphotolibrary://') ?
      this.sanitizer.bypassSecurityTrustUrl(url) :
      url;

    // console.log('SafeURL2: ' + res);
    return res;
  }
}



// async getPhoto() {
//   const modal = await this.modalController.create({
//     component: PhotoLibraryModalPage
//   });
//   return await modal.present();


//   try {
//     await this.photoLibrary.requestAuthorization();
//     const photolib = this.photoLibrary.getLibrary();
//     if (!photolib) {
//       console.warn("IonicNative PhotoLibrary: not available with this Device");
//       return false;
//     }

//     photolib.subscribe((res: any) => {
//       console.log('Library: ' + JSON.stringify(res));
//       res.library.forEach(libraryItem => {
//         console.log(JSON.stringify(libraryItem, null, '\t'));
//       });
//       // error: err => { console.log('could not get photos'); },
//       // complete: () => { console.log('done getting photos'); }
//     });

//     // photolib.subscribe({
//     //   next: obj => {
//     //     console.log('Library: ' + JSON.stringify(obj));
//     //     obj.library.forEach(libraryItem => {
//     //       console.log(JSON.stringify(libraryItem, null, '\t'));

//     //       // console.log(libraryItem.id);           // ID of the photo
//     //       // console.log(libraryItem.photoURL);     // Cross-platform access to photo
//     //       // console.log(libraryItem.thumbnailURL); // Cross-platform access to thumbnail
//     //       // console.log(libraryItem.fileName);
//     //       // console.log(libraryItem.width);
//     //       // console.log(libraryItem.height);
//     //       // console.log(libraryItem.creationDate);
//     //       // console.log(libraryItem.latitude);
//     //       // console.log(libraryItem.longitude);
//     //       // console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
//     //     });
//     //   },
//     //   error: err => { console.log('could not get photos'); },
//     //   complete: () => { console.log('done getting photos'); }
//     // });
//   } catch (error) {
//     console.log('permissions weren\'t granted');
//   }
// }