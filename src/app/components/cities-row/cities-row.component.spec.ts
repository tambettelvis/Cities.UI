import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesRowComponent } from './cities-row.component';

describe('CitiesRowComponent', () => {
  let component: CitiesRowComponent;
  let fixture: ComponentFixture<CitiesRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesRowComponent]
    });
    fixture = TestBed.createComponent(CitiesRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
