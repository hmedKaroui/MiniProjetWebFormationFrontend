import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationManagamentComponent } from './formation-managament.component';

describe('FormationManagamentComponent', () => {
  let component: FormationManagamentComponent;
  let fixture: ComponentFixture<FormationManagamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationManagamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
