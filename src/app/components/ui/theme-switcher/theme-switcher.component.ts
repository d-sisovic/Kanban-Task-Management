import { FormsModule } from '@angular/forms';
import { UtilUiService } from '../../../services/util-ui.service';
import { LocalStorage } from '../../../ts/enums/local-storage.enum';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

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

  private readonly utilUiService = inject(UtilUiService);

  constructor() {}

  public ngOnInit(): void {
    this.checkboxState = this.utilUiService.getInitiallySelectedTheme;
  }

  public onChange(checked: boolean): void {
    const stringChecked = JSON.stringify(checked);

    this.utilUiService.setDocumentAttributeTheme(stringChecked);
    localStorage.setItem(LocalStorage.FRONTEND_MENTOR_THEME, stringChecked);
  }
}
