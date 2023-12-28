import { map } from "rxjs";
import { DestroyRef, inject } from "@angular/core";
import { createTrimWhitespaceValidator } from "../utils/util";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ModalFormArray } from "../components/modal-form-array/ts/types/modal-form-array.type";

export class AddEditModal {

  public readonly destroyRef = inject(DestroyRef);
  public readonly formBuilder = inject(FormBuilder);

  public isAddMode!: boolean;
  public formChanged!: boolean;

  constructor() {}

  public setFormArrayValues(values: ModalFormArray[], formArray: FormArray): void {
    values
      .slice(1, values.length)
      .map(() => this.formBuilder.control('', [createTrimWhitespaceValidator()]))
      .forEach(control => formArray.push(control))
  }

  public watchFormValueChanges(form: FormGroup, initialFormValues: Record<string, any>): void {
    form.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      map(formValues => JSON.stringify(formValues) !== JSON.stringify(initialFormValues))
    )
    .subscribe(formChanged => this.formChanged = formChanged);
  }

  public setIsAddMode(isAddMode: boolean): void {
    this.isAddMode = isAddMode;
    this.formChanged = this.isAddMode;
  }
}
