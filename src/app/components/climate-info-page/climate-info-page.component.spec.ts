import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateInfoPageComponent } from './climate-info-page.component';

describe('ClimateInfoPageComponent', () => {
  let component: ClimateInfoPageComponent;
  let fixture: ComponentFixture<ClimateInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimateInfoPageComponent]
    });
    fixture = TestBed.createComponent(ClimateInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
