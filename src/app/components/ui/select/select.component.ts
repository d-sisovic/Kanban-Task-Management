import { MatFormFieldModule } from '@angular/material/form-field';
import { ILabelValue } from '../../../../ts/models/label-value.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

  @Output() emitChangeSelectValue = new EventEmitter();

  @Input({ required: true }) label!: string;
  @Input({ required: true }) selectedValue!: string;
  @Input({ required: true }) values: ILabelValue[] = [];

  public onChangeValue(event: MatSelectChange): void {
    this.emitChangeSelectValue.emit(event.value);
  }
}
