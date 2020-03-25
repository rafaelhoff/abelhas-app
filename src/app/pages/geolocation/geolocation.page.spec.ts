import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeoLocationPage } from './geolocation.page';

describe('CameraPage', () => {
  let component: GeoLocationPage;
  let fixture: ComponentFixture<GeoLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeoLocationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeoLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
