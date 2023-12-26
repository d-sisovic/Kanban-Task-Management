import { MatMenuModule } from '@angular/material/menu';
import { ITask } from '../../../../../ts/models/task.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SelectComponent } from '../../../ui/select/select.component';
import { ILabelValue } from '../../../../../ts/models/label-value.model';
import { TaskModalComponent } from '../../../task-modal/task-modal.component';
import { SubtaskModalComponent } from '../subtask-modal/subtask-modal.component';
import { SubtaskCompletedCountPipe } from '../../pipes/subtask-completed-count.pipe';
import { StoreTaskService } from '../../../content/services/store/store-task.service';
import { StoreBoardService } from '../../../content/services/store/store-board.service';
import { TaskModalDeleteComponent } from '../../../task-modal-delete/task-modal-delete.component';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Signal, inject } from '@angular/core';

@Component({
  selector: 'app-task-card-modal',
  standalone: true,
  imports: [
    MatMenuModule,
    SelectComponent,
    SubtaskModalComponent,
    SubtaskCompletedCountPipe
  ],
  templateUrl: './task-card-modal.component.html',
  styleUrl: './task-card-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardModalComponent implements OnInit {

  public readonly dialog = inject(MatDialog);
  private readonly storeTaskService = inject(StoreTaskService);
  private readonly storeBoardService = inject(StoreBoardService);

  public dropdownValues: ILabelValue[] = [];
  public selectedTask!: Signal<ITask | null>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: ITask, completedAmount: number }) { }

  public ngOnInit(): void {
    this.dropdownValues = this.storeBoardService.getTaskStatus();
    this.selectedTask = this.storeTaskService.getSelectedTask(this.data.task.id);
  }

  public onChangeTaskStatus(newStatus: string): void {
    const { id } = this.data.task;

    this.storeTaskService.updateTaskStatus(id, newStatus);
  }

  public onEditTask(): void {
    this.dialog.open(TaskModalComponent, { data: { selectedTask: this.selectedTask() } });
  }

  public onDeleteTask(): void {
    this.dialog.open(TaskModalDeleteComponent, { data: { selectedTask: this.selectedTask() } });
  }
}
