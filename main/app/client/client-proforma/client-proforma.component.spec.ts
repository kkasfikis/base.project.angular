import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProformaComponent } from './client-proforma.component';

describe('ClientProformaComponent', () => {
  let component: ClientProformaComponent;
  let fixture: ComponentFixture<ClientProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProformaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
