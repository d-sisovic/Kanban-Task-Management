import { ActivatedRoute } from '@angular/router';
import { IBoard } from '../../../ts/models/board.model';
import { ColumnComponent } from './components/column/column.component';
import { AddColumnComponent } from '../add-column/add-column.component';
import { StoreBoardService } from './services/store/store-board.service';
import { EmptyBoardComponent } from './components/empty-board/empty-board.component';
import { ChangeDetectionStrategy, Component, OnInit, Signal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ColumnComponent,
    AddColumnComponent,
    EmptyBoardComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly storeBoardService = inject(StoreBoardService);

  public selectedBoard: Signal<IBoard | null> = signal(null);

  public ngOnInit(): void {
    this.selectedBoard = this.storeBoardService.getSelectedBoard;

    this.storeBoardService.setBoards(this.activatedRoute.snapshot.data['data']);
  }
}
