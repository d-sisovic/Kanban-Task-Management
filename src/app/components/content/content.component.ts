import { ActivatedRoute } from '@angular/router';
import { IBoard } from '../../../ts/models/board.model';
import { ColumnComponent } from './components/column/column.component';
import { ContentStoreService } from './services/content-store.service';
import { AddColumnComponent } from '../add-column/add-column.component';
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

  private readonly activatedRoute;
  private readonly contentStoreService: ContentStoreService;

  public selectedBoard: Signal<IBoard | null> = signal(null);

  constructor() {
    this.activatedRoute = inject(ActivatedRoute);
    this.contentStoreService = inject(ContentStoreService);
  }

  public ngOnInit(): void {
    this.selectedBoard = this.contentStoreService.getSelectedBoard;

    this.contentStoreService.setBoards(this.activatedRoute.snapshot.data['data']);
  }
}
