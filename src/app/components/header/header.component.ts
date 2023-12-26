import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { IBoard } from '../../../ts/models/board.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { BoardModalDeleteComponent } from '../board-modal-delete/board-modal-delete.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, Signal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rotateChevron', [
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      transition('open <=> closed', animate('0.5s ease'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly storeBoardService = inject(StoreBoardService);

  public isRotated = false;
  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;
  }

  public onAddTask(): void {
    if (!this.selectedBoard()) { return; }

    this.dialog.open(TaskModalComponent, { data: { selectedTask: null } });
  }

  public onEditBoard(): void {
    this.dialog.open(BoardModalComponent, { data: { board: this.selectedBoard() } });
  }

  public onDeleteTask(): void {
    this.dialog.open(BoardModalDeleteComponent, { data: { board: this.selectedBoard() } });
  }

  public onOpenMenu(): void {
    this.isRotated = true;

    const dialogRef = this.dialog.open(MobileMenuComponent);

    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.isRotated = false;
      this.cdRef.markForCheck();
    });
  }
}
