import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { createTrimWhitespaceValidator } from '../../../utils/util';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgClass,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {

  @Input() placeholder!: string;
  @Input() textareaMode!: boolean;
  @Input() isInputRequired = true;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) controlName: string = '';

  private readonly formBuilder = inject(FormBuilder);
  private readonly parentContainer = inject(ControlContainer);

  public formControl!: FormControl;

  public ngOnInit(): void {
    const validators = this.isInputRequired ? [createTrimWhitespaceValidator()] : [];

    this.parentFormGroup.addControl(this.controlName, this.formBuilder.control('', validators));
    this.formControl = this.parentFormGroup.controls[this.controlName] as FormControl;
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }

  private get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
