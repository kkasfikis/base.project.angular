import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicNavigatorComponent } from './dynamic-navigator.component';

describe('DynamicNavigatorComponent', () => {
  let component: DynamicNavigatorComponent;
  let fixture: ComponentFixture<DynamicNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicNavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
