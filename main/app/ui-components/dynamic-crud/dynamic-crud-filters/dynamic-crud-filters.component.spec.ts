import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCrudFiltersComponent } from './dynamic-crud-filters.component';

describe('DynamicCrudFiltersComponent', () => {
  let component: DynamicCrudFiltersComponent;
  let fixture: ComponentFixture<DynamicCrudFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCrudFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCrudFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
