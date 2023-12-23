import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './column-header.component.html',
  styleUrl: './column-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnHeaderComponent {

  @Input({ required: true }) name!: string;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) numberOfTasks!: number;

}
