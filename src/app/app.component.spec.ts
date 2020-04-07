import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TestBed, async } from '@angular/core/testing';

import { MenuController, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { UserDataService } from './providers/UserData.service';

import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoggerModule, NGXLogger } from 'ngx-logger';

describe('AppComponent', () => {
  let menuSpy,
    routerSpy,
    userDataSpy,
    swUpdateSpy,
    platformReadySpy,
    platformSpy,
    app,
    fixture,
    translateServiceSpy;

  beforeEach(async(() => {
    menuSpy = jasmine.createSpyObj('MenuController', ['toggle', 'enable']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    userDataSpy = jasmine.createSpyObj('UserDataService', ['isLoggedIn', 'logout']);
    swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['available', 'activateUpdate']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'setDefaultLang', 'use']);
    const httpClientSpy = jasmine.createSpyObj('Router', ['get']);
    const loggerSpy = jasmine.createSpyObj('NGXLogger', ['log']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [LoggerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: NGXLogger, useValue: loggerSpy },
        { provide: MenuController, useValue: menuSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserDataService, useValue: userDataSpy },
        { provide: SwUpdate, useValue: swUpdateSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });
});
