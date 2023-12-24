import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputComponent } from '../ui/input/input.component';
import { SelectComponent } from '../ui/select/select.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../ui/button/button.component';
import { TaskModalService } from './services/task-modal.service';
import { ILabelValue } from '../../../ts/models/label-value.model';
import { ContentStoreService } from '../content/services/content-store.service';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { TaskModalSubtaskComponent } from './components/task-modal-subtask/task-modal-subtask.component';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    TaskModalSubtaskComponent
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent implements OnInit {

  private readonly taskModalService = inject(TaskModalService);
  private readonly contentStoreService = inject(ContentStoreService);

  public buttonText!: string;
  public taskForm!: FormGroup;
  public selectedStatus!: string;
  public dropdownValues: ILabelValue[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { addMode: boolean }) {}

  public ngOnInit(): void {
    this.taskForm = this.taskModalService.buildTaskModalForm();
    this.dropdownValues = this.contentStoreService.getTaskStatus();

    this.setButtonText();
    this.setSelectedStatus(this.dropdownValues[0]?.value || '');
  }

  public onChangeTaskStatus(newStatus: string): void {
    this.setSelectedStatus(newStatus);
  }

  public onSubmitForm(): void {
    console.log(this.taskForm.value);
  }

  private setButtonText(): void {
    this.buttonText = this.data.addMode ? 'Create Task' : 'Update Task';
  }

  private setSelectedStatus(selectedStatus: string): void {
    this.selectedStatus = selectedStatus;
    this.taskForm.controls['status'].setValue(selectedStatus);
  }
}
