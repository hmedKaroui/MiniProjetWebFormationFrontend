import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeManagamentComponent } from './organisme-managament.component';

describe('OrganismeManagamentComponent', () => {
  let component: OrganismeManagamentComponent;
  let fixture: ComponentFixture<OrganismeManagamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismeManagamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
