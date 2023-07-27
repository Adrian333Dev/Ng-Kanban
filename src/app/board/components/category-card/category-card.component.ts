import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ICategory } from '../../models/category.types';
import { IItem } from '../../models/item.types';
import { menuItems } from '../../constants';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { IColumn } from '../../models/column.interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() column: IColumn;
  @Input() categories: ICategory[];
  @Input() index: number;
  // @Input() tasks: IItem[];
  @Output() onMenuClick = new EventEmitter<{
    action: Actions;
    item?: unknown;
  }>();
  public menuItems = menuItems;

  get tasks() {
    return this.column.tasks;
  }

  get category() {
    return this.column.category;
  }

  constructor() {}

  drop(event: CdkDragDrop<IItem[]>) {
    console.log('event: ', event);
    const item = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onMenuItemClick(action: Actions, task: IItem) {
    switch (action) {
      case 'update':
        this.onMenuClick.emit({ action, item: task });
        break;
      case 'delete':
        this.onMenuClick.emit({ action, item: task.id });
        break;
    }
  }

  handleViewTask(task: IItem) {
    this.onMenuClick.emit({ action: 'view', item: task });
  }
}
