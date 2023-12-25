import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from '../../../ui/input/input.component';
import { ButtonColor } from '../../../../ts/enums/button-color.enum';
import { ButtonComponent } from '../../../ui/button/button.component';
import { createTrimWhitespaceValidator } from '../../../../utils/util';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class TaskModalSubtaskComponent implements OnInit, OnDestroy {

  @Input({ required: true }) controlName: string = '';

  private readonly formBuilder = inject(FormBuilder);
  private readonly parentContainer = inject(ControlContainer);

  public formArray!: FormArray;

  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlName, this.formBuilder.array([this.getNewFormControl]));

    this.formArray = this.parentFormGroup.controls[this.controlName] as FormArray;
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }

  public onRemoveSubtask(index: number): void {
    this.formArray.removeAt(index);
  }

  public onAddSubtask(): void {
    this.formArray.push(this.getNewFormControl);
  }

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }

  private get getNewFormControl(): FormControl {
    return this.formBuilder.control('', [createTrimWhitespaceValidator()]);
  }
}
