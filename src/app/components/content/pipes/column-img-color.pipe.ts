import { Pipe, PipeTransform } from '@angular/core';
import { UtilUiService } from '../../../services/util-ui.service';

@Pipe({
  name: 'columnImgColor',
  standalone: true
})
export class ColumnImgColorPipe implements PipeTransform {

  public transform(index: number): string {
    return UtilUiService.getColorByIndex(index);
  }
}
