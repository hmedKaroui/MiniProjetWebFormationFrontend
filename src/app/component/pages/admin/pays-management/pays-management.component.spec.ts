import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysManagementComponent } from './pays-management.component';

describe('PaysManagementComponent', () => {
  let component: PaysManagementComponent;
  let fixture: ComponentFixture<PaysManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
