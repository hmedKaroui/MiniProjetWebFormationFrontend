import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineManagementComponent } from './domaine-management.component';

describe('DomaineManagementComponent', () => {
  let component: DomaineManagementComponent;
  let fixture: ComponentFixture<DomaineManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaineManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
