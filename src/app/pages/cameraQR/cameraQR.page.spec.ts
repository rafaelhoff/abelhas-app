import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraQRPage } from './cameraQR.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

describe('CameraQRPage', () => {
  let component: CameraQRPage;
  let fixture: ComponentFixture<CameraQRPage>;

  const barcodeScannerSpy = jasmine.createSpyObj('BarcodeScanner', ['scan']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CameraQRPage],
      imports: [IonicModule],
      providers: [
        { provide: BarcodeScanner, useValue: barcodeScannerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
