import { Component, Output, EventEmitter } from '@angular/core';
import { AppPlatform } from '../util/appPlatform';
import { AppLogger } from '../util/appLogger';

@Component({
  selector: 'app-icon-addmedia',
  template: `
  <ion-fab slot="fixed" vertical="bottom" horizontal="end" #fab>
    <ion-fab-button>
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button (click)="getPicture()">
        <ion-icon name="camera"></ion-icon>
      </ion-fab-button>

      <input type="file" id="fileInput" #fileInput accept="image/x-png,image/gif,image/jpeg" hidden />
      <ion-fab-button *ngIf="isWeb" (click)="uploadFile(fileInput)">
        <ion-icon name="attach"></ion-icon>
      </ion-fab-button>
      <ion-fab-button (click)="recordAudio()">
        <ion-icon name="mic"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>`
})
export class IconAddMediaComponent {
  @Output() clickPicture = new EventEmitter();
  @Output() clickUploadFile = new EventEmitter();
  @Output() clickRecordAudio = new EventEmitter();

  isWeb = false;
  validMimeTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

  constructor(
    private appPlatform: AppPlatform,
    private logger: AppLogger
  ) {
    this.appPlatform.isWeb().then(w => this.isWeb = w);
  }

  async getPicture() {
    this.clickPicture.emit();
  }

  async recordAudio() {
    this.clickRecordAudio.emit();
  }

  async uploadFile(fileInput) {
    const a = fileInput.click(); // this work
    fileInput.addEventListener('change', e => {
      const file: File = e.target.files[0];
      this.logger.trace('Details:', file);

      if (this.validMimeTypes.findIndex((mime: string) => mime === file.type) >= 0) {
        this.clickUploadFile.emit({ file });
      } else {
        // TODO: inform the user.
        this.logger.info('invalid file selected', file.type);
      }

    }, false);

    // TODO: handle reading the file: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  }
}
