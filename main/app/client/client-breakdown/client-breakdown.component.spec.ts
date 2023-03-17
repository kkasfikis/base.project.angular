import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBreakdownComponent } from './client-breakdown.component';

describe('ClientBreakdownComponent', () => {
  let component: ClientBreakdownComponent;
  let fixture: ComponentFixture<ClientBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBreakdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
