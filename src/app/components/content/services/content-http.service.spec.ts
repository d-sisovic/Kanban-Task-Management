import { TestBed } from '@angular/core/testing';
import { ContentHttpService } from './content-http.service';

describe('ContentHttpService', () => {
  let service: ContentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
