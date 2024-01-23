import { ColumnImgColorPipe } from './column-img-color.pipe';

describe('ColumnImgColorPipe', () => {
  it('create an instance', () => {
    const pipe = new ColumnImgColorPipe();
    expect(pipe).toBeTruthy();
  });

  it('create return correct color by provided index', () => {
    const pipe = new ColumnImgColorPipe();

    expect(pipe.transform(0)).toBe('#49C4E5');
    expect(pipe.transform(1)).toBe('#8471F2');
    expect(pipe.transform(2)).toBe('#67E2AE');
  });
});
