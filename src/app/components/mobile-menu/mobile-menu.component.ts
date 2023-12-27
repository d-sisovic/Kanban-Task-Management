import { NgClass } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from '../../../ts/models/board.model';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { ThemeSwitcherComponent } from '../ui/theme-switcher/theme-switcher.component';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    NgClass,
    ThemeSwitcherComponent
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent implements OnInit {

  public readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(DialogRef);
  private readonly storeBoardService = inject(StoreBoardService);

  public boards!: WritableSignal<IBoard[] | null>;

  public ngOnInit(): void {
    this.boards = this.storeBoardService.getBoards;
  }

  public onSelectBoard(index: number): void {
    this.closeDialog();
    this.storeBoardService.selectBoard(index);
  }

  public onCreateNewBoard(): void {
    this.dialog.open(BoardModalComponent, { data: { board: null } });
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }
}
