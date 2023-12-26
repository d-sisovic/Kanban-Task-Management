import { TestBed } from '@angular/core/testing';
import { BoardModalService } from './board-modal.service';

describe('BoardModalService', () => {
  let service: BoardModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
