import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuOptionTreeComponent } from './side-menu-option-tree.component';

describe('SideMenuOptionTreeComponent', () => {
  let component: SideMenuOptionTreeComponent;
  let fixture: ComponentFixture<SideMenuOptionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuOptionTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuOptionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
