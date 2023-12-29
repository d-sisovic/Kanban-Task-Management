import { LocalStorage } from '../ts/enums/local-storage.enum';
import { Injectable, WritableSignal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilUiService {

  private expandSidebar: WritableSignal<boolean> = signal(this.getInitialExpandSidebarValue);
  private showSidebarState: WritableSignal<boolean> = signal(this.shouldShowSidebarMenu(window.innerWidth));

  constructor() {
    effect(() => {
      const expandSidebar = this.expandSidebar();

      localStorage.setItem(LocalStorage.FRONTEND_MENTOR_EXPAND_SIDEBAR, JSON.stringify(expandSidebar))
    });
  }

  public toggleExpandSidebar(): void {
    this.expandSidebar.update(previous => !previous);
  }

  public get watchToggleExpandSidebar(): WritableSignal<boolean> {
    return this.expandSidebar;
  }

  public emitShowSidebar(windowWidth: number): void {
    this.showSidebarState.set(this.shouldShowSidebarMenu(windowWidth));
  }

  public get watchShowSidebar(): WritableSignal<boolean> {
    return this.showSidebarState;
  }

  public static getColorByIndex(index: number): string {
    const predefinedColors = ['#49C4E5', '#8471F2', '#67E2AE'];

    if (index < predefinedColors.length) { return predefinedColors[index]; }

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private get getInitialExpandSidebarValue(): boolean {
    const expandSidebarSaved = localStorage.getItem(LocalStorage.FRONTEND_MENTOR_EXPAND_SIDEBAR);

    try {
      return JSON.parse(expandSidebarSaved || 'true');
    } catch {
      return true;
    }
  }

  private shouldShowSidebarMenu(windowWidth: number): boolean {
    return windowWidth >= 768;
  }
}
