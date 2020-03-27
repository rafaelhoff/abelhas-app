import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPage } from './configuration.page';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipeMock } from 'src/app/util/translatePipe.mock';

describe('ConfigurationPage', () => {
  let component: ConfigurationPage;
  let fixture: ComponentFixture<ConfigurationPage>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'setDefaultLang', 'get', 'subscribe']);

    TestBed.configureTestingModule({
      declarations: [ConfigurationPage, TranslatePipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
