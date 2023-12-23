import { NgClass } from '@angular/common';
import { ISubtask } from '../../../../../ts/models/subtask.model';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-subtask-modal',
  standalone: true,
  imports: [
    NgClass,
    MatCheckboxModule
  ],
  templateUrl: './subtask-modal.component.html',
  styleUrl: './subtask-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubtaskModalComponent {

  @ViewChild('checkbox') checkboxElement!: MatCheckbox;

  @Input({ required: true }) subtask!: ISubtask;

  public onToggleCheckbox(): void {
    this.checkboxElement.toggle();
  }
}
