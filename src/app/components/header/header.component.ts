import { NgClass } from '@angular/common';
import { IBoard } from '../../../ts/models/board.model';
import { UtilUiService } from '../../services/util-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ContentStoreService } from '../content/services/content-store.service';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Signal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly utilUiService = inject(UtilUiService);
  private readonly contentStoreService = inject(ContentStoreService);

  private dialogRef!: MatDialogRef<TaskModalComponent, any>;
  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.contentStoreService.getSelectedBoard;

    this.watchCloseDialogRef();
  }

  public onAddTask(): void {
    if (!this.selectedBoard()) { return; }

    this.dialogRef = this.dialog.open(TaskModalComponent, { data: { addMode: true } });
  }

  private watchCloseDialogRef(): void {
    this.utilUiService.watchCloseDialogEvent$()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => this.dialogRef.close())
  }
}
