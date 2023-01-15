import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSOAComponent } from './csoa.component';

describe('CSOAComponent', () => {
  let component: CSOAComponent;
  let fixture: ComponentFixture<CSOAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSOAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
