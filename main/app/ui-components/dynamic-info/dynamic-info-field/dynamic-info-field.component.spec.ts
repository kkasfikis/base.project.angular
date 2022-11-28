import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInfoFieldComponent } from './dynamic-info-field.component';

describe('DynamicInfoFieldComponent', () => {
  let component: DynamicInfoFieldComponent;
  let fixture: ComponentFixture<DynamicInfoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicInfoFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicInfoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
