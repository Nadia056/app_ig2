import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crud7Component } from './crud7.component';

describe('Crud7Component', () => {
  let component: Crud7Component;
  let fixture: ComponentFixture<Crud7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Crud7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crud7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
