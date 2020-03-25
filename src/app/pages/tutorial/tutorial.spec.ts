import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { MenuController } from '@ionic/angular';

import { TutorialPage } from './tutorial';

import { TranslateService } from '@ngx-translate/core';
import { TranslatePipeMock } from './../../util/translatePipe.mock';

import { IonicStorageModule } from '@ionic/storage';
describe('TutorialPage', () => {
  let fixture, app;

  beforeEach(async(() => {
    const menuSpy = jasmine.createSpyObj('MenuController', [
      'toggle',
      'enable'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'setDefaultLang', 'get', 'subscribe']);

    TestBed.configureTestingModule({
      declarations: [TutorialPage, TranslatePipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicStorageModule.forRoot()],
      providers: [
        { provide: MenuController, useValue: menuSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialPage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the tutorial page', () => {
    expect(app).toBeTruthy();
  });

  it('should check the tutorial status', async () => {
    const didTuts = await app.storage.get('ion_did_tutorial');
    expect(didTuts).toBeFalsy();
  });
});
