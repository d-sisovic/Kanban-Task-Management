import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from '../../../ts/models/board.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { StoreBoardService } from '../content/services/store/store-board.service';
import { ChangeDetectionStrategy, Component, OnInit, Signal, inject, signal } from '@angular/core';

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
  private readonly storeBoardService = inject(StoreBoardService);

  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;
  }

  public onAddTask(): void {
    if (!this.selectedBoard()) { return; }

    this.dialog.open(TaskModalComponent, { data: { selectedTask: null } });
  }
}
