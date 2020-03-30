import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'cdvphotolibrary' })
export class CDVPhotoLibraryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string) {
    const res: SafeUrl = url.startsWith('cdvphotolibrary://') ?
      this.sanitizer.bypassSecurityTrustUrl(url) :
      url;

    return res;
  }
}
