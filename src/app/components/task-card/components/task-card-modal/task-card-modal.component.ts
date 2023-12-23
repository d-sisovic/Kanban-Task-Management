import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../../../../../ts/models/task.model';
import { SelectComponent } from '../../../ui/select/select.component';
import { ILabelValue } from '../../../../../ts/models/label-value.model';
import { SubtaskModalComponent } from '../subtask-modal/subtask-modal.component';
import { ContentStoreService } from '../../../content/services/content-store.service';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-task-card-modal',
  standalone: true,
  imports: [
    SelectComponent,
    SubtaskModalComponent
  ],
  templateUrl: './task-card-modal.component.html',
  styleUrl: './task-card-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardModalComponent implements OnInit {

  private readonly contentStoreService: ContentStoreService;

  public dropdownValues: ILabelValue[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: ITask, completedAmount: number }) {
    this.contentStoreService = inject(ContentStoreService);
  }

  public ngOnInit(): void {
    this.dropdownValues = this.contentStoreService.getTaskStatus();
  }

  public onChangeTaskStatus(newStatus: string): void {
    const { title } = this.data.task;

    this.contentStoreService.updateTaskStatus(title, newStatus);
  }
}
