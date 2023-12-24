import { NgClass } from '@angular/common';
import { ISubtask } from '../../../../../ts/models/subtask.model';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ContentStoreService } from '../../../content/services/content-store.service';
import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';

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

  private readonly contentStoreService = inject(ContentStoreService);

  public onToggleCheckbox(): void {
    this.checkboxElement.toggle();

    this.onChange(this.checkboxElement.checked);
  }

  public onChange(isChecked: boolean): void {
    this.contentStoreService.updateSubtaskStatus(isChecked, this.subtask.title);
  }
}
