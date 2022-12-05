import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSubFormInfoComponent } from './dynamic-sub-form-info.component';

describe('DynamicSubFormInfoComponent', () => {
  let component: DynamicSubFormInfoComponent;
  let fixture: ComponentFixture<DynamicSubFormInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSubFormInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSubFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
