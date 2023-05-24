import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceItemsComponent } from './device-items.component';

describe('DeviceItemsComponent', () => {
  let component: DeviceItemsComponent;
  let fixture: ComponentFixture<DeviceItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceItemsComponent]
    });
    fixture = TestBed.createComponent(DeviceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
