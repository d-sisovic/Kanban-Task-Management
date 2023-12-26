import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ISubtask } from '../../../../../ts/models/subtask.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from '../../../ui/input/input.component';
import { ButtonColor } from '../../../../ts/enums/button-color.enum';
import { ButtonComponent } from '../../../ui/button/button.component';
import { createTrimWhitespaceValidator } from '../../../../utils/util';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter,
  Input, OnDestroy, OnInit, Output, WritableSignal, effect, inject, signal
} from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-task-modal-subtask',
  standalone: true,
  imports: [
    NgClass,
    InputComponent,
    MatInputModule,
    ButtonComponent,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  templateUrl: './task-modal-subtask.component.html',
  styleUrl: './task-modal-subtask.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalSubtaskComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() subtasksChangedEvent: EventEmitter<ISubtask[]> = new EventEmitter<ISubtask[]>();

  @Input() existingSubtasks: ISubtask[] = [];
  @Input({ required: true }) controlName: string = '';

  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly parentContainer = inject(ControlContainer);

  public formArray!: FormArray;
  private subtasks: WritableSignal<ISubtask[]> = signal([]);

  constructor() {
    effect(() => this.subtasksChangedEvent.emit(this.subtasks()));
  }

  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlName, this.formBuilder.array([this.getNewFormControl]));

    this.formArray = this.parentFormGroup.controls[this.controlName] as FormArray;
  }

  public ngAfterViewInit(): void {
    this.watchFormArrayChanges();
    this.subtasks.set(this.existingSubtasks);
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }

  public onRemoveSubtask(index: number): void {
    this.formArray.removeAt(index, { emitEvent: false });
    this.filterExistingSubtask(index);
  }

  public onAddSubtask(): void {
    this.formArray.push(this.getNewFormControl, { emitEvent: false });
    this.createNewSubtask();
  }

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }

  private watchFormArrayChanges(): void {
    this.formArray.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formValues => {
        this.subtasks.update(previous => previous.map((subtask, index) => ({ ...subtask, title: formValues[index] })));
      });
  }

  private createNewSubtask(): void {
    this.subtasks.update(previous => [...previous, { id: uuid.v4(), title: '', isCompleted: false }]);
  }

  private filterExistingSubtask(selectedIndex: number): void {
    this.subtasks.update(previous => previous.filter((_, index) => index !== selectedIndex));
    this.parentFormGroup.updateValueAndValidity();
  }

  private get getNewFormControl(): FormControl {
    return this.formBuilder.control('', [createTrimWhitespaceValidator()]);
  }
}
