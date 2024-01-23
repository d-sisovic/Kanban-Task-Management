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

  it('should return correct color index', () => {
    const zeroIndexColor = UtilUiService.getColorByIndex(0);

    expect(zeroIndexColor).toBe('#49C4E5');

    const oneIndexColor = UtilUiService.getColorByIndex(1);

    expect(oneIndexColor).toBe('#8471F2');

    const twoIndexColor = UtilUiService.getColorByIndex(2);

    expect(twoIndexColor).toBe('#67E2AE');

    const predefinedColors = ['#49C4E5', '#8471F2', '#67E2AE'];

    const threeIndexColor = UtilUiService.getColorByIndex(3);

    expect(predefinedColors.every(color => threeIndexColor !== color)).toBe(true);
  });

  it('should hide sidebar menu', () => {
    expect(service.shouldShowSidebarMenu(767)).toEqual(false);
  });
});
