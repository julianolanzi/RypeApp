import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUpdateAdminComponent } from './team-update-admin.component';

describe('TeamUpdateAdminComponent', () => {
  let component: TeamUpdateAdminComponent;
  let fixture: ComponentFixture<TeamUpdateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamUpdateAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
