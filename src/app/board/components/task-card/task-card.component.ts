import { Component, Input } from '@angular/core';
import { IItem } from '../../models/item.types';
import { menuItems } from '../../constants';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PromptModalComponent } from 'src/app/shared/components/prompt-modal/prompt-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
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

  public menuItems = menuItems;

  constructor(
    public dialog: MatDialog,
    private itemService: ItemService,
    private boardService: BoardService
  ) {}

  onMenuItemClick(action: Actions) {
    switch (action) {
      case 'update':
        this.handleUpdate();
        break;
      case 'delete':
        this.handleDelete();
        break;
    }
  }

  handleUpdate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = {
      header: 'Update Task',
      item: this.task,
      categories: this.categories,
      mode: 'update',
    };
    const updateDialogRef = this.dialog.open(TaskModalComponent, dialogConfig);
    updateDialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.itemService
          .update(this.task.id, { ...result, order_id: 1 })
          .subscribe((res) => this.boardService.init());
    });
  }

  handleDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = {
      header: 'Delete Task',
      body: 'Are you sure you want to delete this task?',
      mode: 'delete',
    };
    const deleteDialogRef = this.dialog.open(
      PromptModalComponent,
      dialogConfig
    );
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.itemService
          .delete(this.task.id)
          .subscribe((res) => this.boardService.init());
    });
  }

  handleView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = {
      header: 'View Task',
      item: this.task,
      categories: this.categories,
      mode: 'view',
    };
    const viewDialogRef = this.dialog.open(TaskModalComponent, dialogConfig);
  }
}
