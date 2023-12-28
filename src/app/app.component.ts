import { RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { UtilUiService } from './services/util-ui.service';
import { LocalStorage } from './ts/enums/local-storage.enum';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { StoreBoardService } from './components/content/services/store/store-board.service';
import { Component, HostListener, OnInit, WritableSignal, effect, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SideMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this.setIfSideMenuIsVisible((event.target as Window).innerWidth);
  }

  private readonly utilUiService = inject(UtilUiService);
  private readonly storeBoardService = inject(StoreBoardService);

  public showSideMenu!: WritableSignal<boolean>;
  public expandSidebar!: WritableSignal<boolean>;

  constructor() {
    effect(() => {
      const boards = this.storeBoardService.getBoards();

      if (boards === null) { return; }

      localStorage.setItem(LocalStorage.FRONTEND_MENTOR_KANBAN, JSON.stringify(boards));
    });
  }

  public ngOnInit(): void {
    this.showSideMenu = this.utilUiService.watchShowSidebar;
    this.expandSidebar = this.utilUiService.watchToggleExpandSidebar;
  }

  public onToggleSidebar(): void {
    this.utilUiService.toggleExpandSidebar();
  }

  private setIfSideMenuIsVisible(innerWidth: number): void {
    this.utilUiService.emitShowSidebar(innerWidth);
  }
}
