import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUpdateMemberComponent } from './team-update-member.component';

describe('TeamUpdateMemberComponent', () => {
  let component: TeamUpdateMemberComponent;
  let fixture: ComponentFixture<TeamUpdateMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamUpdateMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
