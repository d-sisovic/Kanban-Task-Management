import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from '../ui/input/input.component';
import { ButtonColor } from '../../ts/enums/button-color.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../ui/button/button.component';
import { createTrimWhitespaceValidator } from '../../utils/util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalFormArray } from './ts/types/modal-form-array.type';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter,
  Input, OnDestroy, OnInit, Output, WritableSignal, effect, inject, signal
} from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-modal-form-array',
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
  templateUrl: './modal-form-array.component.html',
  styleUrl: './modal-form-array.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalFormArrayComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() itemsChangedEvent: EventEmitter<ModalFormArray[]> = new EventEmitter<ModalFormArray[]>();

  @Input() subtaskMode: boolean = true;
  @Input() existingItems: ModalFormArray[] = [];
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) controlName: string = '';

  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly parentContainer = inject(ControlContainer);

  public addNewText!: string;
  public formArray!: FormArray;
  private items: WritableSignal<ModalFormArray[]> = signal([]);

  constructor() {
    effect(() => this.itemsChangedEvent.emit(this.items()));
  }

  public ngOnInit(): void {
    this.setAddTextButton();

    this.parentFormGroup.addControl(this.controlName, this.formBuilder.array([this.getNewFormControl]));
    this.formArray = this.parentFormGroup.controls[this.controlName] as FormArray;
  }

  public ngAfterViewInit(): void {
    this.watchFormArrayChanges();
    this.items.set(this.existingItems);
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }

  public onRemoveItem(index: number): void {
    this.formArray.removeAt(index, { emitEvent: false });
    this.filterExistingItem(index);
  }

  public onAddItem(): void {
    this.formArray.push(this.getNewFormControl, { emitEvent: false });
    this.createNewItem();
  }

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }

  private setAddTextButton(): void {
    this.addNewText = !this.subtaskMode ? '+ Add New Column' : '+ Add New Subtask';
  }

  private watchFormArrayChanges(): void {
    this.formArray.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formValues => {
        this.items.update(previous => previous.map((item, index) => ({ ...item, [this.getNewItemKey]: formValues[index] })));
      });
  }

  private createNewItem(): void {
    this.items.update(previous => [...previous, this.getNewItem]);
    this.emitFormValueChanges();
  }

  private filterExistingItem(selectedIndex: number): void {
    this.items.update(previous => previous.filter((_, index) => index !== selectedIndex));
    this.emitFormValueChanges();
  }

  private emitFormValueChanges(): void {
    this.parentFormGroup.updateValueAndValidity();
  }

  private get getNewItemKey(): string {
    return this.subtaskMode ? 'title' : 'name';
  }

  private get getNewItem(): ModalFormArray {
    const id = uuid.v4();

    return this.subtaskMode ? { id, title: '', isCompleted: false } : { id, name: '', tasks: [] };
  }

  private get getNewFormControl(): FormControl {
    return this.formBuilder.control('', [createTrimWhitespaceValidator()]);
  }
}
