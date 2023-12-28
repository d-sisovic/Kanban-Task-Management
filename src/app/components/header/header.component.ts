import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from '../../../ts/models/board.model';
import { MenuComponent } from '../ui/menu/menu.component';
import { enterAnimationDuration } from './../../utils/util';
import { UtilUiService } from '../../services/util-ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../ui/button/button.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { BoardModalDeleteComponent } from '../board-modal-delete/board-modal-delete.component';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    MenuComponent,
    ButtonComponent
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

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly utilUiService = inject(UtilUiService);
  private readonly storeBoardService = inject(StoreBoardService);

  public expandSidebar!: WritableSignal<boolean>;
  public isRotated: WritableSignal<boolean> = signal(false);
  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;
    this.expandSidebar = this.utilUiService.watchToggleExpandSidebar;
  }

  public onAddTask(): void {
    if (!this.selectedBoard()) { return; }

    this.dialog.open(TaskModalComponent, { data: { selectedTask: null }, enterAnimationDuration });
  }

  public onEditBoard(): void {
    this.dialog.open(BoardModalComponent, { data: { board: this.selectedBoard() }, enterAnimationDuration });
  }

  public onDeleteBoard(): void {
    this.dialog.open(BoardModalDeleteComponent, { data: { board: this.selectedBoard() }, enterAnimationDuration });
  }

  public onOpenMenu(): void {
    if (window.innerWidth >= 768) { return; }

    this.isRotated.set(true);

    const dialogRef = this.dialog.open(MobileMenuComponent, { enterAnimationDuration });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isRotated.set(false));
  }
}
