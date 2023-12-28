import { NgClass } from '@angular/common';
import { ButtonColor } from '../../../ts/enums/button-color.enum';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Output() clickHandler = new EventEmitter();

  @Input() disabled!: boolean;
  @Input() small: boolean = true;
  @Input({ required: true }) label!: string;
  @Input() color: ButtonColor = ButtonColor.PRIMARY;

  public onClick(): void {
    this.clickHandler.emit();
  }

  public get getButtonColor(): typeof ButtonColor {
    return ButtonColor;
  }
}
