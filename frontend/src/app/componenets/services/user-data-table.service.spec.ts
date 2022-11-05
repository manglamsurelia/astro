import { TestBed } from '@angular/core/testing';

import { UserDataTableService } from './user-data-table.service';

describe('UserDataTableService', () => {
  let service: UserDataTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
