import { TestBed } from '@angular/core/testing';
import { ContentStoreService } from './content-store.service';

describe('ContentStoreService', () => {
  let service: ContentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
