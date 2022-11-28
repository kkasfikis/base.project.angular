import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInfoDialogComponent } from './dynamic-info-dialog.component';

describe('DynamicInfoDialogComponent', () => {
  let component: DynamicInfoDialogComponent;
  let fixture: ComponentFixture<DynamicInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
