import { ITask } from '../../../ts/models/task.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

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

  public ngOnInit(): void {
    this.completedAmount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }
}
