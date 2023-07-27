import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';

import { IColumn } from '../../models/column.interface';
import { BoardService } from 'src/app/core/services/board.service';
import { CatergoryService } from 'src/app/core/services/catergory.service';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { IDotMenuItem } from 'src/app/shared/components/dot-menu/dot-menu.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ICategory, UpdateCategory } from '../../models/category.types';
import { ItemService } from 'src/app/core/services/item.service';
import { menuItems } from '../../constants';
import { CreateItem } from '../../models/item.types';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

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

  public menuItems = menuItems;

  @ViewChild('taskModal') taskModal: TaskModalComponent;
  @ViewChild('editCategoryModal') editCategoryModal: EditCategoryModalComponent;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private categoryService: CatergoryService,
    private itemService: ItemService
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

  onSubmitEditCategory(category: UpdateCategory) {
    this.categoryService
      .update(category)
      .pipe(takeUntil(this.unSub))
      .subscribe((res) => {
        this.boardService.init();
      });
  }

  onCancelCategory() {
    this.categoryForm.reset();
    this.creatingCategory = false;
  }

  onCategoryMenuItemClick(action: Actions, id: any) {
    this.creatingCategory = false;
    switch (action) {
      case 'delete':
        this.handleCategoryDelete(id);
        break;
      case 'update':
        this.handleCategoryEdit(id);
        break;
    }
  }

  handleCategoryDelete(id: any) {
    const confirm = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirm)
      this.categoryService
        .delete(id)
        .pipe(takeUntil(this.unSub))
        .subscribe((res) => this.boardService.init());
  }

  handleCategoryEdit(id: string) {
    this.editCategoryModal.category = this.categories.value.find(
      (category) => category.id === id
    );
    this.editCategoryModal.open();
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
    switch (action) {
      case 'create':
        this.taskModal.header = 'Create Task';
        this.taskModal.task = { category_id: item } as any;
        this.taskModal.categories = this.categories.value;
        this.taskModal.mode = 'create';
        this.taskModal.open();
        break;
      case 'update':
        break;
      case 'view':
        break;
    }
  }

  onSubmitCreateTask(task: CreateItem) {
    this.itemService.create(task).subscribe((res) => this.boardService.init());
  }

  onSubmitUpdateTask(task: CreateItem) {}

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
