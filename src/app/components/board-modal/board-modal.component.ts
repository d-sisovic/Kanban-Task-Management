import { IBoard } from '../../../ts/models/board.model';
import { IColumn } from '../../../ts/models/column.model';
import { IBoardForm } from './ts/models/board-form.model';
import { InputComponent } from '../ui/input/input.component';
import { ButtonComponent } from '../ui/button/button.component';
import { AddEditModal } from '../../classes/add-edit-modal.class';
import { BoardModalService } from './services/board-modal.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { ModalFormArray } from '../modal-form-array/ts/types/modal-form-array.type';
import { ModalFormArrayComponent } from '../modal-form-array/modal-form-array.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ModalFormArrayComponent
  ],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardModalComponent extends AddEditModal implements OnInit, AfterViewInit {

  private readonly dialogRef = inject(MatDialog);
  private readonly storeBoardService = inject(StoreBoardService);
  private readonly boardModalService = inject(BoardModalService);

  public buttonText!: string;
  public boardForm!: FormGroup;

  private newColumns: IColumn[] = [];
  private initialFormValues!: IBoardForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { board: IBoard | null }) {
    super();
   }

  public ngOnInit(): void {
    this.boardForm = this.boardModalService.buildBoardModalForm();

    super.setIsAddMode(this.data.board === null);
    this.setButtonText();
  }

  public ngAfterViewInit(): void {
    this.setFormValues();
    this.watchFormValueChanges();
  }

  public onSubmitForm(): void {
    this.closeAllDialogs();

    const { name, columns } = this.boardForm.value;
    const id = this.data.board?.id || uuid.v4();

    this.isAddMode ? this.handleAddBoard(name, id, columns) : this.handleUpdateBoard(name, id);
  }

  public onSetNewColumns(newColumns: ModalFormArray[]): void {
    this.newColumns = newColumns.slice() as IColumn[];
  }

  public override watchFormValueChanges(): void {
    if (this.isAddMode) { return; }

    this.initialFormValues = { ...this.boardForm.value };

    super.watchFormValueChanges(this.boardForm, this.initialFormValues);
  }

  private setButtonText(): void {
    this.buttonText = this.isAddMode ? 'Create New Board' : 'Save Changes';
  }

  private setFormValues(): void {
    if (this.isAddMode) { return; }

    const { name, columns } = this.data.board as IBoard;

    super.setFormArrayValues(columns, this.getColumnsFormArray);

    this.boardForm.patchValue({ name, columns: columns.map(column => column.name) });
  }

  private closeAllDialogs(): void {
    this.dialogRef.closeAll();
  }

  private handleAddBoard(boardName: string, boardId: string, columns: string[]): void {
    const newColumns = this.storeBoardService.createNewColumns(columns);

    this.storeBoardService.createNewBoard(boardName, boardId, newColumns);
  }

  private handleUpdateBoard(boardName: string, boardId: string): void {
    this.storeBoardService.updateBoard(boardName, boardId, this.newColumns);
  }

  private get getColumnsFormArray(): FormArray {
    return this.boardForm.controls['columns'] as FormArray;
  }
}
