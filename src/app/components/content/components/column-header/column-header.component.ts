import { NgStyle } from '@angular/common';
import { ColumnImgColorPipe } from '../../pipes/column-img-color.pipe';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-header',
  standalone: true,
  imports: [
    NgStyle,
    ColumnImgColorPipe
  ],
  templateUrl: './column-header.component.html',
  styleUrl: './column-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnHeaderComponent {

  @Input({ required: true }) name!: string;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) numberOfTasks!: number;

}
