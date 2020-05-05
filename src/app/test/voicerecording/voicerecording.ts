import { Component } from '@angular/core';
import { AppMediaStorage } from 'src/app/util/appMediaStorage';
import { AudioRecord } from 'src/app/shared/recordAudio.component';


@Component({
  selector: 'app-voice',
  templateUrl: 'voicerecording.html'
})
export class VoiceRecordingPage {
  records: AudioRecord[] = [];

  constructor(
    private appMediaStorage: AppMediaStorage
  ) { }

  play(audio: HTMLAudioElement) {
    if (audio) {
      audio.play();
    }
  }

  save(record: AudioRecord) {
    try {
      this.appMediaStorage.saveAudioToS3(record.audio, record.recordedAt.toISOString() + '.ogg');
    } catch (error) {
      console.log(error);
    }
  }

  newRecord(audio: AudioRecord) {
    this.records.push(audio);
  }
}
