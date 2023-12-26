import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, effect, inject } from '@angular/core';
import { LocalStorage } from './ts/enums/local-storage.enum';
import { HeaderComponent } from './components/header/header.component';
import { StoreBoardService } from './components/content/services/store/store-board.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly storeBoardService = inject(StoreBoardService);

  constructor() {
    effect(() => {
      const boards = this.storeBoardService.getBoards();

      if (boards === null) { return; }

      localStorage.setItem(LocalStorage.FRONTEND_MENTOR_KANBAN, JSON.stringify(boards));
    });
  }
}
