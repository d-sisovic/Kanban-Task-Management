import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../../ts/models/task.model';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { TaskCardModalComponent } from './components/task-card-modal/task-card-modal.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent implements OnInit {

  @Input() task!: ITask;

  public completedAmount = 0;

  public dialog: MatDialog;

  constructor() {
    this.dialog = inject(MatDialog);
  }

  public ngOnInit(): void {
    this.completedAmount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  public onCardClick(): void {
    this.dialog.open(TaskCardModalComponent, { data: { task: this.task, completedAmount: this.completedAmount } });
  }
}
