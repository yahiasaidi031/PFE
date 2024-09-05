import { TestBed } from '@angular/core/testing';

import { ProgressProjectService } from './progress-project.service';

describe('ProgressProjectService', () => {
  let service: ProgressProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
