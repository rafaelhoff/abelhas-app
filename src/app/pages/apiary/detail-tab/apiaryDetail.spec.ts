import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { ApiaryDetailPage } from './apiaryDetail';
import { TranslatePipeMock } from 'src/app/util/translatePipe.mock';

describe('ApiaryDetailPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiaryDetailPage, TranslatePipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the tabs page', () => {
    const fixture = TestBed.createComponent(ApiaryDetailPage);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
