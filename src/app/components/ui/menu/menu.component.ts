import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  public onEdit(): void {
    this.editEvent.emit();
  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }
}
