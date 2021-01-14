import { Component } from '@angular/core';
import { AppMediaStorage } from 'src/app/util/appMediaStorage';
import { AudioRecord } from 'src/app/shared/recordAudio.component';
import { AppLogger } from 'src/app/util/appLogger';


@Component({
  selector: 'app-voice',
  templateUrl: 'voicerecording.html'
})
export class VoiceRecordingPage {
  records: AudioRecord[] = [];

  constructor(
    private appMediaStorage: AppMediaStorage,
    private logger: AppLogger
  ) { }

  play(audio: HTMLAudioElement) {
    if (audio) {
      audio.play();
    }
  }

  save(record: AudioRecord) {
    try {
      this.appMediaStorage.putAudio(record);
    } catch (error) {
      this.logger.error(error);
    }
  }

  newRecord(audio: AudioRecord) {
    this.records.push(audio);
  }
}
