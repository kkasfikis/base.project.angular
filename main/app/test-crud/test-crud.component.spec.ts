import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCrudComponent } from './test-crud.component';

describe('TestCrudComponent', () => {
  let component: TestCrudComponent;
  let fixture: ComponentFixture<TestCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
