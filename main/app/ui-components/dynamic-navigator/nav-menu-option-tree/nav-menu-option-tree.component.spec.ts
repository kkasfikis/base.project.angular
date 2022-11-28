import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuOptionTreeComponent } from './nav-menu-option-tree.component';

describe('NavMenuOptionTreeComponent', () => {
  let component: NavMenuOptionTreeComponent;
  let fixture: ComponentFixture<NavMenuOptionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMenuOptionTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuOptionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
