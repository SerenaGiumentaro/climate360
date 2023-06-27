import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveContentComponent } from './active-content.component';

describe('ActiveContentComponent', () => {
  let component: ActiveContentComponent;
  let fixture: ComponentFixture<ActiveContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveContentComponent]
    });
    fixture = TestBed.createComponent(ActiveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
