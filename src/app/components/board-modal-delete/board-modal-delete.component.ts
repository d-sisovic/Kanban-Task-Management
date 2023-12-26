import { IBoard } from '../../../ts/models/board.model';
import { ButtonColor } from '../../ts/enums/button-color.enum';
import { ButtonComponent } from '../ui/button/button.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';

@Component({
  selector: 'app-board-modal-delete',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './board-modal-delete.component.html',
  styleUrl: './board-modal-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardModalDeleteComponent {

  private readonly dialogRef = inject(MatDialog);
  private readonly storeBoardService = inject(StoreBoardService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { board: IBoard }) { }

  public onDeleteBoard(): void {
    this.storeBoardService.deleteBoard(this.data.board.id);
    this.onCloseModal();
  }

  public onCloseModal(): void {
    this.dialogRef.closeAll();
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }
}
