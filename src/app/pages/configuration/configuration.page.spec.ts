import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPage } from './configuration.page';
import { TranslatePipeMock } from 'src/app/util/translatePipe.mock';
import { Router } from '@angular/router';
import { ConfigDataService } from 'src/app/providers/configData.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

describe('ConfigurationPage', () => {
  let component: ConfigurationPage;
  let fixture: ComponentFixture<ConfigurationPage>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const configServiceSpy = jasmine.createSpyObj('ConfigService', {
      loadPreData: new Observable(),
      load: Promise.resolve()
    });
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'setDefaultLang', 'get', 'subscribe', 'use']);
    const loggerSpy = jasmine.createSpyObj('NGXLogger', ['log']);

    TestBed.configureTestingModule({
      declarations: [ConfigurationPage, TranslatePipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ConfigDataService, useValue: configServiceSpy },
        { provide: NGXLogger, useValue: loggerSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useValue: translateServiceSpy }
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
