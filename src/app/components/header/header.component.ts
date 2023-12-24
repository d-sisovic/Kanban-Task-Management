import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from '../../../ts/models/board.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ContentStoreService } from '../content/services/content-store.service';
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

  public readonly dialog: MatDialog = inject(MatDialog);
  private readonly contentStoreService = inject(ContentStoreService);

  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.contentStoreService.getSelectedBoard;
  }

  public onAddTask(): void {
    if (!this.selectedBoard()) { return; }

    this.dialog.open(TaskModalComponent, { data: { addMode: true } });
  }
}
