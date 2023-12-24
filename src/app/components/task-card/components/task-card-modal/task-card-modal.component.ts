import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../../../../../ts/models/task.model';
import { SelectComponent } from '../../../ui/select/select.component';
import { ILabelValue } from '../../../../../ts/models/label-value.model';
import { SubtaskModalComponent } from '../subtask-modal/subtask-modal.component';
import { SubtaskCompletedCountPipe } from '../../pipes/subtask-completed-count.pipe';
import { ContentStoreService } from '../../../content/services/content-store.service';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Signal, inject } from '@angular/core';

@Component({
  selector: 'app-task-card-modal',
  standalone: true,
  imports: [
    SelectComponent,
    SubtaskModalComponent,
    SubtaskCompletedCountPipe
  ],
  templateUrl: './task-card-modal.component.html',
  styleUrl: './task-card-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardModalComponent implements OnInit {

  private readonly contentStoreService = inject(ContentStoreService);

  public dropdownValues: ILabelValue[] = [];
  public selectedTask!: Signal<ITask | null>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: ITask, completedAmount: number }) {}

  public ngOnInit(): void {
    this.dropdownValues = this.contentStoreService.getTaskStatus();
    this.selectedTask = this.contentStoreService.getSelectedTask(this.data.task.title);
  }

  public onChangeTaskStatus(newStatus: string): void {
    const { title } = this.data.task;

    this.contentStoreService.updateTaskStatus(title, newStatus);
  }
}
