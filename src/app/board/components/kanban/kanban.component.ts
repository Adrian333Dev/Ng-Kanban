import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IColumn } from '../../models/column.interface';
import { BoardService } from 'src/app/core/services/board.service';
import { CatergoryService } from 'src/app/core/services/catergory.service';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { IDotMenuItem } from 'src/app/shared/components/dot-menu/dot-menu.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ICategory } from '../../models/category.types';
import { ItemService } from 'src/app/core/services/item.service';
import { PromptModalComponent } from 'src/app/shared/components/prompt-modal/prompt-modal.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  public columns = new BehaviorSubject<IColumn[]>([]);
  public categories = new BehaviorSubject<ICategory[]>([]);
  private unSub = new Subject<void>();
  public categoryForm: FormGroup;
  public creatingCategory = false;

  public menuItems: IDotMenuItem[] = [
    { label: 'Edit', icon: 'edit', action: 'update' },
    { label: 'Delete', icon: 'delete', action: 'delete' },
  ];

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private categoryService: CatergoryService,
    private itemService: ItemService,
    public dialog: MatDialog
  ) {}

  onDrop(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(
      this.columns.value,
      event.previousIndex,
      event.currentIndex
    );
  }

  onCardDrop(event: CdkDragDrop<any[]>, cards: any[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(cards, event.previousIndex, event.currentIndex);
    } else {
      const movedCard = cards[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSubmitCategory() {
    if (this.categoryForm.valid) {
      this.categoryService
        .create(this.categoryForm.value)
        .pipe(takeUntil(this.unSub))
        .subscribe((res) => {
          this.boardService.init();
          this.onCancelCategory();
          this.boardService.init();
        });
    } else this.categoryForm.markAllAsTouched();
  }

  onCancelCategory() {
    this.categoryForm.reset();
    this.creatingCategory = false;
  }

  onCategoryMenuItemClick(action: Actions, id: any) {
    this.creatingCategory = false;
    switch (action) {
      case 'delete':
        const dialogRef = this.dialog.open(PromptModalComponent, {
          width: '400px',
          data: {
            header: 'Delete Category',
            message: 'Are you sure you want to delete this category?',
            mode: 'delete',
          },
        });
        dialogRef.afterClosed().subscribe((res) => {
          if (res)
            this.categoryService
              .delete(id)
              .pipe(takeUntil(this.unSub))
              .subscribe((res) => this.boardService.init());
        });
        break;
      case 'update':
        break;
    }
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category_title: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.boardService
      .onColumnsChange()
      .pipe(takeUntil(this.unSub))
      .subscribe((columns) => {
        this.columns.next(columns);
      });
    this.boardService.init();

    this.categoryService.onCategoriesChange().subscribe((categories) => {
      this.categories.next(categories);
    });
  }

  openTaskDialog(action: Actions, item?: unknown) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = { header: '', item: {} };

    switch (action) {
      case 'create':
        (dialogConfig.data.header = 'Create Task'),
          (dialogConfig.data.item.category_id = item),
          (dialogConfig.data.categories = this.categories.value);
        break;
      case 'update':
        dialogConfig.data = { header: 'Update Task', item };
        break;
      case 'view':
        dialogConfig.data = { header: 'Task Details', item };
        break;
    }

    const taskDialogRef = this.dialog.open(TaskModalComponent, dialogConfig);

    taskDialogRef.afterClosed().subscribe((res) => {
      // console.log(res, action, item);
      if (res) {
        switch (action) {
          case 'create':
            this.itemService.create(res).subscribe((res) => {
              this.boardService.init();
            });
            break;
          case 'update':
            // this.boardService.update(res.id, res);
            break;
          case 'delete':
            // this.boardService.delete(res.id);
            break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
