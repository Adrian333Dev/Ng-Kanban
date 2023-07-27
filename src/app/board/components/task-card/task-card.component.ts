import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../models/item.types';
import { menuItems } from '../../constants';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { ICategory } from '../../models/category.types';
import { ItemService } from 'src/app/core/services/item.service';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Partial<IItem>;
  @Input() categories: ICategory[];
  @Output() onMenuClick = new EventEmitter<{
    action: Actions;
    item?: unknown;
  }>();

  public menuItems = menuItems;

  constructor() {}

  onMenuItemClick(action: Actions) {
    switch (action) {
      case 'update':
        this.onMenuClick.emit({ action, item: this.task });
        break;
      case 'delete':
        this.onMenuClick.emit({ action, item: this.task.id });
        break;
    }
  }

  handleViewTask() {
    this.onMenuClick.emit({ action: 'view', item: this.task });
  }
}
