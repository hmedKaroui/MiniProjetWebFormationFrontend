import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSessionManagamentComponent } from './inner-session-managament.component';

describe('InnerSessionManagamentComponent', () => {
  let component: InnerSessionManagamentComponent;
  let fixture: ComponentFixture<InnerSessionManagamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerSessionManagamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSessionManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
