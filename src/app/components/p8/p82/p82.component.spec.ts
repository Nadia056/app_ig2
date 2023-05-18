import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P82Component } from './p82.component';

describe('P82Component', () => {
  let component: P82Component;
  let fixture: ComponentFixture<P82Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P82Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P82Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
