import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Practica92Component } from './practica92.component';

describe('Practica92Component', () => {
  let component: Practica92Component;
  let fixture: ComponentFixture<Practica92Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Practica92Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Practica92Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
