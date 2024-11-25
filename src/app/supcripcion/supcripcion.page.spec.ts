import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupcripcionPage } from './supcripcion.page';

describe('SupcripcionPage', () => {
  let component: SupcripcionPage;
  let fixture: ComponentFixture<SupcripcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupcripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
