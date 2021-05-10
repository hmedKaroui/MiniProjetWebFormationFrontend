import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionOfFormationComponent } from './session-of-formation.component';

describe('SessionOfFormationComponent', () => {
  let component: SessionOfFormationComponent;
  let fixture: ComponentFixture<SessionOfFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionOfFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionOfFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
