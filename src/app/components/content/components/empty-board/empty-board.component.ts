import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyBoardComponent {

}
