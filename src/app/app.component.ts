import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, effect, inject } from '@angular/core';
import { LocalStorage } from './ts/enums/local-storage.enum';
import { HeaderComponent } from './components/header/header.component';
import { ContentStoreService } from './components/content/services/content-store.service';

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

  private readonly contentStoreService: ContentStoreService;

  constructor() {
    this.contentStoreService = inject(ContentStoreService);

    effect(() => {
      const boards = this.contentStoreService.getBoards();

      if (boards === null) { return; }

      localStorage.setItem(LocalStorage.FRONTEND_MENTOR_KANBAN, JSON.stringify(boards));
    });
  }
}
