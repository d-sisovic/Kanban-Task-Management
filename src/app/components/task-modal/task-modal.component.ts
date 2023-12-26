import { map } from 'rxjs';
import { ITask } from '../../../ts/models/task.model';
import { ISubtask } from '../../../ts/models/subtask.model';
import { InputComponent } from '../ui/input/input.component';
import { SelectComponent } from '../ui/select/select.component';
import { ButtonComponent } from '../ui/button/button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createTrimWhitespaceValidator } from '../../utils/util';
import { TaskModalService } from './services/task-modal.service';
import { ILabelValue } from '../../../ts/models/label-value.model';
import { ITaskModalForm } from './ts/models/task-modal-form.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreTaskService } from '../content/services/store/store-task.service';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskModalSubtaskComponent } from './components/task-modal-subtask/task-modal-subtask.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import * as uuid from 'uuid';

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
export class TaskModalComponent implements OnInit, AfterViewInit {

  private readonly dialogRef = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly taskModalService = inject(TaskModalService);
  private readonly storeTaskService = inject(StoreTaskService);
  private readonly storeBoardService = inject(StoreBoardService);

  public isAddMode!: boolean;
  public buttonText!: string;
  public taskForm!: FormGroup;
  public formChanged!: boolean;
  public dropdownValues: ILabelValue[] = [];

  private initialFormValues!: ITask;
  private newSubtasks: ISubtask[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTask: ITask | null }) { }

  public ngOnInit(): void {
    this.taskForm = this.taskModalService.buildTaskModalForm();
    this.dropdownValues = this.storeBoardService.getTaskStatus();

    this.setIsAddMode();
    this.setButtonText();
    this.setSelectedStatus(this.dropdownValues[0]?.value || '');
  }

  public ngAfterViewInit(): void {
    this.setFormValues();
    this.watchFormValueChanges();
  }

  public onChangeTaskStatus(newStatus: string): void {
    this.setSelectedStatus(newStatus);
  }

  public onSubmitForm(): void {
    this.closeAllDialogs();

    const { value } = this.taskForm;
    const id = this.data.selectedTask?.id || uuid.v4();
    const selectedBoardId = this.storeBoardService.getSelectedBoard()?.id || null;

    this.isAddMode ? this.handleAddTask(value, id, selectedBoardId) : this.handleUpdateTask(value, id, selectedBoardId);
  }

  public onSetNewSubtasks(newSubtasks: ISubtask[]): void {
    this.newSubtasks = newSubtasks.slice();
  }

  public get getSelectedStatusControl(): FormControl {
    return this.taskForm.get('status') as FormControl;
  }

  private handleAddTask(formValues: ITaskModalForm, id: string, selectedBoardId: string | null): void {
    const subtasks = this.storeTaskService.createNewSubtasks(formValues.subtasks);

    this.storeTaskService.addNewTask({ ...formValues, id, subtasks }, selectedBoardId);
  }

  private handleUpdateTask(formValues: ITaskModalForm, id: string, selectedBoardId: string | null): void {
    // Here initial status is set, so that if status is changed, it's updated by handleChangeColumn fn
    const task = { ...formValues, id, status: this.initialFormValues.status, subtasks: this.newSubtasks };

    this.storeTaskService.updateTask(task, selectedBoardId);

    this.handleChangeColumn(id, formValues.status);
  }

  private handleChangeColumn(taskId: string, status: string): void {
    if (this.initialFormValues.status === status) { return; }

    this.storeTaskService.updateTaskStatus(taskId, status);
  }

  private closeAllDialogs(): void {
    this.dialogRef.closeAll();
  }

  private watchFormValueChanges(): void {
    if (this.isAddMode) { return; }

    this.initialFormValues = { ...this.taskForm.value };

    this.taskForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(formValues => JSON.stringify(formValues) !== JSON.stringify(this.initialFormValues))
      )
      .subscribe(formChanged => this.formChanged = formChanged);
  }

  private setFormValues(): void {
    if (this.isAddMode) { return; }

    const { title, description, status, subtasks } = this.data.selectedTask as ITask;

    subtasks
      .slice(1, subtasks.length)
      .map(() => this.formBuilder.control('', [createTrimWhitespaceValidator()]))
      .forEach(control => this.getSubtasksFormArray.push(control))

    this.taskForm.patchValue({ title, description, status, subtasks: subtasks.map(subtask => subtask.title) });
  }

  private setIsAddMode(): void {
    this.isAddMode = this.data.selectedTask === null;
    this.formChanged = this.isAddMode;
  }

  private setButtonText(): void {
    this.buttonText = this.isAddMode ? 'Create Task' : 'Update Task';
  }

  private setSelectedStatus(selectedStatus: string): void {
    this.taskForm.controls['status'].setValue(selectedStatus);
  }

  private get getSubtasksFormArray(): FormArray {
    return this.taskForm.controls['subtasks'] as FormArray;
  }
}
