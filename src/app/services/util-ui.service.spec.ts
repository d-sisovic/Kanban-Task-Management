import { TestBed } from '@angular/core/testing';
import { UtilUiService } from './util-ui.service';

describe('UtilUiService', () => {
  let service: UtilUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
