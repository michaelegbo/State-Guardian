import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateGuardianComponent } from './state-guardian.component';

describe('StateGuardianComponent', () => {
  let component: StateGuardianComponent;
  let fixture: ComponentFixture<StateGuardianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateGuardianComponent]
    });
    fixture = TestBed.createComponent(StateGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
