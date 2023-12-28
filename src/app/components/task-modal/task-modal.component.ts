import { ITask } from '../../../ts/models/task.model';
import { IBoard } from '../../../ts/models/board.model';
import { ISubtask } from '../../../ts/models/subtask.model';
import { InputComponent } from '../ui/input/input.component';
import { SelectComponent } from '../ui/select/select.component';
import { ButtonComponent } from '../ui/button/button.component';
import { TaskModalService } from './services/task-modal.service';
import { AddEditModal } from '../../classes/add-edit-modal.class';
import { ILabelValue } from '../../../ts/models/label-value.model';
import { ITaskModalForm } from './ts/models/task-modal-form.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreTaskService } from '../content/services/store/store-task.service';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { ModalFormArray } from '../modal-form-array/ts/types/modal-form-array.type';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalFormArrayComponent } from '../modal-form-array/modal-form-array.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ModalFormArrayComponent
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent extends AddEditModal implements OnInit, AfterViewInit {

  private readonly dialogRef = inject(MatDialog);
  private readonly taskModalService = inject(TaskModalService);
  private readonly storeTaskService = inject(StoreTaskService);
  private readonly storeBoardService = inject(StoreBoardService);

  public buttonText!: string;
  public taskForm!: FormGroup;
  public dropdownValues: ILabelValue[] = [];

  private initialFormValues!: ITask;
  private newSubtasks: ISubtask[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTask: ITask | null }) {
    super();
  }

  public ngOnInit(): void {
    this.taskForm = this.taskModalService.buildTaskModalForm();
    this.dropdownValues = this.storeBoardService.getTaskStatus();

    super.setIsAddMode(this.data.selectedTask === null);
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
    const selectedBoardId = (this.storeBoardService.getSelectedBoard() as IBoard).id;

    this.isAddMode ? this.handleAddTask(value, id, selectedBoardId) : this.handleUpdateTask(value, id, selectedBoardId);
  }

  public onSetNewSubtasks(newSubtasks: ModalFormArray[]): void {
    this.newSubtasks = newSubtasks.slice() as ISubtask[];
  }

  public get getSelectedStatusControl(): FormControl {
    return this.taskForm.get('status') as FormControl;
  }

  public override watchFormValueChanges(): void {
    if (this.isAddMode) { return; }

    this.initialFormValues = { ...this.taskForm.value };

    super.watchFormValueChanges(this.taskForm, this.initialFormValues);
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

  private setFormValues(): void {
    if (this.isAddMode) { return; }

    const { title, description, status, subtasks } = this.data.selectedTask as ITask;

    super.setFormArrayValues(subtasks, this.getSubtasksFormArray);

    this.taskForm.patchValue({ title, description, status, subtasks: subtasks.map(subtask => subtask.title) });
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
