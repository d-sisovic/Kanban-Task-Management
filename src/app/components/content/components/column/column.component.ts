import { IColumn } from '../../../../../ts/models/column.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskCardComponent } from '../../../task-card/task-card.component';
import { ColumnHeaderComponent } from '../column-header/column-header.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    TaskCardComponent,
    ColumnHeaderComponent
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent {

  @Input({ required: true }) index!: number;
  @Input({ required: true }) column!: IColumn;

}
