import { NgClass } from '@angular/common';
import { IBoard } from '../../../ts/models/board.model';
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

  private readonly contentStoreService: ContentStoreService;

  public selectedBoard: Signal<IBoard | null> = signal(null);

  constructor() {
    this.contentStoreService = inject(ContentStoreService);
  }

  public ngOnInit(): void {
    this.selectedBoard = this.contentStoreService.getSelectedBoard;
  }
}
