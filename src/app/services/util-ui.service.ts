import { DOCUMENT } from '@angular/common';
import { LocalStorage } from '../ts/enums/local-storage.enum';
import { Inject, Injectable, WritableSignal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilUiService {

  private expandSidebar: WritableSignal<boolean> = signal(this.getInitialExpandSidebarValue);
  private showSidebarState: WritableSignal<boolean> = signal(this.shouldShowSidebarMenu(window.innerWidth));

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
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

  public setDocumentAttributeTheme(checked: string): void {
    this.document.querySelector('body')?.setAttribute('data-theme', checked);
  }

  public get getInitiallySelectedTheme(): boolean {
    try {
      return JSON.parse(localStorage.getItem(LocalStorage.FRONTEND_MENTOR_THEME) || 'false');
    } catch {
      return false;
    }
  }

  private get getInitialExpandSidebarValue(): boolean {
    try {
      return JSON.parse(localStorage.getItem(LocalStorage.FRONTEND_MENTOR_EXPAND_SIDEBAR) || 'true');
    } catch {
      return true;
    }
  }

  private shouldShowSidebarMenu(windowWidth: number): boolean {
    return windowWidth >= 768;
  }
}
