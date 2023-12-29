import { NgClass } from '@angular/common';
import { IBoard } from '../../../../../ts/models/board.model';
import { IColumn } from '../../../../../ts/models/column.model';
import { TaskCardComponent } from '../../../task-card/task-card.component';
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { StoreTaskService } from '../../services/store/store-task.service';
import { StoreBoardService } from '../../services/store/store-board.service';
import { ColumnHeaderComponent } from '../column-header/column-header.component';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    NgClass,
    CdkDrag,
    CdkDropList,
    TaskCardComponent,
    ColumnHeaderComponent,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent {

  @Input({ required: true }) index!: number;
  @Input({ required: true }) column!: IColumn;

  private readonly storeTaskService = inject(StoreTaskService);
  private readonly storeBoardService = inject(StoreBoardService);

  public onDrop(event: unknown) {
    const selectedBoardId = (this.storeBoardService.getSelectedBoard() as IBoard).id;
    const { container, previousContainer, currentIndex, previousIndex } = event as CdkDragDrop<string[]>;

    if (previousContainer === container) {
      this.storeTaskService.moveTaskInExistingColumn(this.column, selectedBoardId, currentIndex, previousIndex);
      return;
    }

    const previousColumnId = previousContainer.data as unknown as string;

    this.storeTaskService.transferTaskInAnotherColumn(this.column, previousColumnId, selectedBoardId, currentIndex, previousIndex);
  }
}
