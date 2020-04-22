import { Component, Output, EventEmitter } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';

// not mandatory, only for code completion
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { AppPlatform } from '../util/appPlatform';
import { AppLogger } from '../util/appLogger';

// without types
const { VoiceRecorder, Device } = Plugins;

// TODO: npm install -D @types/dom-mediacapture-record
declare var MediaRecorder: any;

@Component({
  selector: 'app-record-audio',
  template: `
  <div *ngIf="!recording">
    <ion-button (click)="start()">
      <ion-icon name="mic"></ion-icon>
    </ion-button>
  </div>

  <div *ngIf="recording">
    <ion-button (click)="stop(false)">
      <ion-icon name="close-circle"></ion-icon>
    </ion-button>

    <span style="padding:5px;width:55px;display:inline-block">{{timerString}}</span>

    <ion-button (click)="stop(true)">
      <ion-icon name="checkmark-circle"></ion-icon>
    </ion-button>
  </div>
  `
})
export class RecordAudioComponent {
  recording: boolean = false;
  mediaRecorder: any = null;
  saveAudio: boolean = false;
  timerString = '00:00';
  intervalObj: any;
  isWeb: boolean = false;

  @Output() newRecord = new EventEmitter<AudioRecord>();

  constructor(
    private logger: AppLogger,
    private appPlatform: AppPlatform
  ) {
    appPlatform.isWeb().then(w => this.isWeb = w);
  }

  async start() {
    this.recording = true;
    this.intervalObj = this.setTimer();

    if (this.isWeb) {
      return this.startWeb();
    } else {
      return this.startMobile();
    }
  }

  private async startMobile() {
    try {
      if (!VoiceRecorder) {
        throw new Error('VoiceRecorder not found.');
      }

      // will print true / false based on the device ability to record
      const canRecord: GenericResponse = await VoiceRecorder.canDeviceVoiceRecord();
      this.logger.trace(canRecord.value);

      // /**
      // * will prompt the user to give the required permission, after that
      // * the function will print true / false based on the user response
      // */
      const resultReq: GenericResponse = await VoiceRecorder.requestAudioRecordingPermission();
      this.logger.trace(resultReq.value);

      // will print true / false based on the status of the recording permission
      const hasRequest: GenericResponse = await VoiceRecorder.hasAudioRecordingPermission();
      this.logger.trace(hasRequest.value);

      // /**
      // * In case of success the promise will resolve with {"value": true}
      // * in case of an error the promise will reject with one of the following messages:
      // * "MISSING_PERMISSION", "ALREADY_RECORDING", "CANNOT_RECORD_ON_THIS_PHONE" or "FAILED_TO_RECORD"
      // */
      const result: GenericResponse = await VoiceRecorder.startRecording();
      this.logger.trace(result.value);

    } catch (error) {
      // TODO: fix this error.
      this.logger.error(error);
    }
    return true;
  }

  private async startWeb() {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();

      const audioChunks = [];

      this.mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('stop', () => {
        if (this.saveAudio) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });

          this.newRecord.emit({
            audio: new Audio(URL.createObjectURL(audioBlob)),
            recordedAt: new Date()
          });
        }
      });
    } catch (error) {
      // TODO: fix this error.
      this.logger.error(error);
    }
  }

  async stop(saveAudio: boolean) {
    this.saveAudio = saveAudio;
    this.recording = false;
    clearInterval(this.intervalObj);
    this.timerString = '00:00';

    if (Capacitor.platform === 'web') {
      this.mediaRecorder.stop();
    } else {

      // /**
      // * In case of success the promise will resolve with:
      // * {"value": { recordDataBase64: string, msDuration: number, mimeType: string }},
      // * the file will be in *.acc format.
      // * in case of an error the promise will reject with one of the following messages:
      // * "RECORDING_HAS_NOT_STARTED" or "FAILED_TO_FETCH_RECORDING"
      // */
      try {
        const result: RecordingData = await VoiceRecorder.stopRecording();
        if (saveAudio) {
          this.newRecord.emit({
            audio: new Audio(`data:audio/aac;base64,${result.value.recordDataBase64}`),
            recordedAt: new Date()
          });
        }
      } catch (error) {
        // TODO: fix this error.
        this.logger.error(error);
      }
    }
  }

  setTimer() {
    let timer = 0;
    // Update the count down every 1 second
    const interval = setInterval(() => {
      timer++;
      const zeroPad = (num) => String(num).padStart(2, '0');
      const minutes = Math.floor(timer / 60);
      const seconds = timer - minutes * 60;

      this.timerString = `${zeroPad(minutes)}:${zeroPad(seconds)}`;

    }, 1000);
    return interval;
  }

}

export interface AudioRecord {
  audio: HTMLAudioElement;
  recordedAt: Date;
}
