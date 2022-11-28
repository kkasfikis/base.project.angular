import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInfoComponent } from './dynamic-info.component';

describe('DynamicInfoComponent', () => {
  let component: DynamicInfoComponent;
  let fixture: ComponentFixture<DynamicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
