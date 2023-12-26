import { TestBed } from '@angular/core/testing';
import { StoreBoardService } from './store-board.service';

describe('StoreBoardService', () => {
  let service: StoreBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
