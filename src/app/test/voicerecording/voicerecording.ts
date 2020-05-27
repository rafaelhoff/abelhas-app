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
      this.appMediaStorage.saveAudioToS3(record.audio, record.recordedAt.toISOString() + '.ogg');
    } catch (error) {
      this.logger.log(error);
    }
  }

  newRecord(audio: AudioRecord) {
    this.records.push(audio);
  }
}
