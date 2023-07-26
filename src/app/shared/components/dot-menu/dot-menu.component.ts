import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actions } from '../../models/maps/crud.map';

export interface IDotMenuItem {
  label: string;
  icon: string;
  iconColor?: string;
  action: Actions;
  disabled?: boolean;
}

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
  styleUrls: ['./dot-menu.component.scss'],
})
export class DotMenuComponent {
  @Input() public menuItems: IDotMenuItem[] = [];
  @Output() public menuItemClick = new EventEmitter<Actions>();

  public onMenuItemClick(action: Actions) {
    this.menuItemClick.emit(action);
  }
}
