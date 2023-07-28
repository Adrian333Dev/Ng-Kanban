import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() column: IColumn;
  @Input() categories: ICategory[];
  @Input() index: number;
  @Output() onTaskAction = new EventEmitter<{
    action: Actions;
    item: unknown;
  }>();
  @Output() onCategoryMenuClick = new EventEmitter<{
    action: Actions;
    id: any;
  }>();
  @Output() handleDropEvent = new EventEmitter<{
    idxToStartReorderFrom: number;
    categoryIdx: number;
  }>();

  public categoryForm: FormGroup;

  public menuItems = menuItems;

  get tasks() {
    return this.column.tasks;
  }

  get category() {
    return this.column.category;
  }

  constructor() {}

  drop(event: CdkDragDrop<IItem[]>, category?: ICategory) {
    // console.log('event: ', event);
    const item = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.handleDropEvent.emit({
        idxToStartReorderFrom: event.currentIndex,
        categoryIdx: this.index,
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.handleDropEvent.emit({
        idxToStartReorderFrom: event.currentIndex,
        categoryIdx: this.index,
      });
    }
  }

  ngOnInit(): void {}

  onCategoryMenuItemClick(action: Actions) {
    this.onCategoryMenuClick.emit({ action, id: this.category.id });
  }

  handleViewTask(task: IItem) {
    this.onTaskAction.emit({ action: 'view', item: task });
  }

  handleAddTask() {
    this.onTaskAction.emit({ action: 'create', item: this.category.id });
  }

  onTaskMenuItemClick(action: Actions, task: IItem) {
    this.onTaskAction.emit({ action, item: task });
  }
}
