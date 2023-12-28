import { MatDialog } from '@angular/material/dialog';
import { IBoard } from '../../../../../ts/models/board.model';
import { enterAnimationDuration } from '../../../../utils/util';
import { ButtonComponent } from '../../../ui/button/button.component';
import { StoreBoardService } from '../../services/store/store-board.service';
import { BoardModalComponent } from '../../../board-modal/board-modal.component';
import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyBoardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly storeBoardService = inject(StoreBoardService);

  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;
  }

  public onEditBoard(): void {
    this.dialog.open(BoardModalComponent, { data: { board: this.selectedBoard() }, enterAnimationDuration });
  }
 }
