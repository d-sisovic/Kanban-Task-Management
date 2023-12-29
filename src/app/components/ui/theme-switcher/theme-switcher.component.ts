import { FormsModule } from '@angular/forms';
import { LocalStorage } from '../../../ts/enums/local-storage.enum';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitcherComponent implements OnInit {

  public checkboxState = false;

  public ngOnInit(): void {
    this.checkboxState = this.getInitiallySelectedTheme;
  }

  public onChange(checked: boolean): void {
    localStorage.setItem(LocalStorage.FRONTEND_MENTOR_THEME, JSON.stringify(checked));
  }

  private get getInitiallySelectedTheme(): boolean {
    try {
      return JSON.parse(localStorage.getItem(LocalStorage.FRONTEND_MENTOR_THEME) || 'false');
    } catch {
      return false;
    }
  }
}
