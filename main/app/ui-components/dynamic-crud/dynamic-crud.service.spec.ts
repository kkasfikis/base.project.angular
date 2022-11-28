import { TestBed } from '@angular/core/testing';

import { DynamicCrudService } from './dynamic-crud.service';

describe('DynamicCrudService', () => {
  let service: DynamicCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
