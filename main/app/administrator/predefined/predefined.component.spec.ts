import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedComponent } from './predefined.component';

describe('PredefinedComponent', () => {
  let component: PredefinedComponent;
  let fixture: ComponentFixture<PredefinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
