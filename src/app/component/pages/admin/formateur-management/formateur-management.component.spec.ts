import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurManagementComponent } from './formateur-management.component';

describe('FormateurManagementComponent', () => {
  let component: FormateurManagementComponent;
  let fixture: ComponentFixture<FormateurManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormateurManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
