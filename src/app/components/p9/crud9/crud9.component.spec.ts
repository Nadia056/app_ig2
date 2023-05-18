import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud9Component } from './crud9.component';

describe('Crud9Component', () => {
  let component: Crud9Component;
  let fixture: ComponentFixture<Crud9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Crud9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crud9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
