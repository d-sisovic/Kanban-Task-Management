import { TestBed } from '@angular/core/testing';
import { ContentHttpService } from './content-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContentHttpService', () => {
  let service: ContentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
