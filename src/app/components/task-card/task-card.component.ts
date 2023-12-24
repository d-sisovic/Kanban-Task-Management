import { ITask } from '../../../ts/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { TaskCardModalComponent } from './components/task-card-modal/task-card-modal.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent implements OnChanges {

  @Input() task!: ITask;

  public readonly dialog = inject(MatDialog);

  public completedAmount = 0;

  public ngOnChanges(): void {
    if (!this.task) { return; }

    this.completedAmount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  public onCardClick(): void {
    this.dialog.open(TaskCardModalComponent, { data: { task: this.task, completedAmount: this.completedAmount } });
  }
}
