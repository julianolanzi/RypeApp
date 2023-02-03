import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningsComponent } from './tranings.component';

describe('TraningsComponent', () => {
  let component: TraningsComponent;
  let fixture: ComponentFixture<TraningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
