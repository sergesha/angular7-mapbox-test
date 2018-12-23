import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTogglesComponent } from './map-toggles.component';

describe('MapTogglesComponent', () => {
  let component: MapTogglesComponent;
  let fixture: ComponentFixture<MapTogglesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTogglesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
