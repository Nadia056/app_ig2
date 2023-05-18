import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud8Component } from './crud8.component';

describe('Crud8Component', () => {
  let component: Crud8Component;
  let fixture: ComponentFixture<Crud8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Crud8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crud8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
