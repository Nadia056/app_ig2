import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P72Component } from './p72.component';

describe('P72Component', () => {
  let component: P72Component;
  let fixture: ComponentFixture<P72Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P72Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P72Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
