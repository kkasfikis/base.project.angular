import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSubFormComponent } from './dynamic-sub-form.component';

describe('DynamicSubFormComponent', () => {
  let component: DynamicSubFormComponent;
  let fixture: ComponentFixture<DynamicSubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSubFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
