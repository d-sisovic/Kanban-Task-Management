import { UtilUiService } from '../../services/util-ui.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeSwitcherComponent } from '../ui/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    MobileMenuComponent,
    ThemeSwitcherComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {

  private readonly utilUiService = inject(UtilUiService);

  public onToggleSidebar(): void {
    this.utilUiService.toggleExpandSidebar();
  }
}
