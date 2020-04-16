import { Component } from '@angular/core';

import { Plugins, Capacitor, DeviceInfo } from '@capacitor/core';

// not mandatory, only for code completion
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { AppMediaStorage } from 'src/app/util/appMediaStorage';


// without types
const { VoiceRecorder, Device } = Plugins;

// TODO: npm install -D @types/dom-mediacapture-record
declare var MediaRecorder: any;

@Component({
  selector: 'app-voice',
  templateUrl: 'voicerecording.html'
})
export class VoiceRecordingPage {
  recording: boolean = false;
  mediaRecorder: any = null;
  records: any[] = [];
  saveAudio: boolean = false;
  timer: number = 0;
  intervalObj: any;

  constructor(
    private appMediaStorage: AppMediaStorage
  ) { }

  async start() {
    this.recording = true;
    this.intervalObj = this.setTimer();

    const isWeb: boolean = await this.isWeb();
    if (isWeb) {
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
      console.log(canRecord.value);

      // /**
      // * will prompt the user to give the required permission, after that
      // * the function will print true / false based on the user response
      // */
      const resultReq: GenericResponse = await VoiceRecorder.requestAudioRecordingPermission();
      console.log(resultReq.value);

      // will print true / false based on the status of the recording permission
      const hasRequest: GenericResponse = await VoiceRecorder.hasAudioRecordingPermission();
      console.log(hasRequest.value);

      // /**
      // * In case of success the promise will resolve with {"value": true}
      // * in case of an error the promise will reject with one of the following messages:
      // * "MISSING_PERMISSION", "ALREADY_RECORDING", "CANNOT_RECORD_ON_THIS_PHONE" or "FAILED_TO_RECORD"
      // */
      const result: GenericResponse = await VoiceRecorder.startRecording();
      console.log(result.value);

    } catch (error) {
      console.log(error);
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

          this.records.push({
            audio: new Audio(URL.createObjectURL(audioBlob)),
            recordedAt: new Date().toISOString()
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async stop(saveAudio: boolean) {
    this.saveAudio = saveAudio;
    this.recording = false;
    clearInterval(this.intervalObj);

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
          this.records.push({
            audio: new Audio(`data:audio/aac;base64,${result.value.recordDataBase64}`),
            recordedAt: new Date()
          });
        }
      } catch (error) {
        console.log(error);
      }

    }

  }

  play(audio: HTMLAudioElement) {
    if (audio) {
      audio.play();
    }
  }

  setTimer() {
    this.timer = 0;
    // Update the count down every 1 second
    let interval = setInterval(() => {
      this.timer++;
    }, 1000);
    return interval;
  }

  save(record: any) {
    try {
      this.appMediaStorage.saveAudioToS3(record.audio, record.recordedAt + '.ogg');
    } catch (error) {
      console.log(error);
    }
  }

  private async isWeb(): Promise<boolean> {
    const info: DeviceInfo = await Device.getInfo();
    return (info.platform === 'web');
  }

}
