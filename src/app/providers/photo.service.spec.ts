import { TestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoService = TestBed.inject(PhotoService);
    expect(service).toBeTruthy();
  });
});
