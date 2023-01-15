import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOAComponent } from './soa.component';

describe('SOAComponent', () => {
  let component: SOAComponent;
  let fixture: ComponentFixture<SOAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
