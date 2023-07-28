import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { IColumn } from '../../models/column.interface';
import { BoardService } from 'src/app/core/services/board.service';
import { CatergoryService } from 'src/app/core/services/catergory.service';
import { Actions } from 'src/app/shared/models/maps/crud.map';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ICategory, UpdateCategory } from '../../models/category.types';
import { ItemService } from 'src/app/core/services/item.service';
import { menuItems } from '../../constants';
import { CreateItem, IItem, UpdateItem } from '../../models/item.types';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  public categories = new BehaviorSubject<ICategory[]>([]);
  private unSub = new Subject<void>();
  public categoryForm: FormGroup;
  public creatingCategory = false;

  public menuItems = menuItems;

  @ViewChild('taskModal') taskModal: TaskModalComponent;
  @ViewChild('editCategoryModal') editCategoryModal: EditCategoryModalComponent;

  // ! Drag and Drop Start
  public lists: CategoryCardComponent[] = [];
  public columns: IColumn[] = [];

  handleDrop({
    idxToStartReorderFrom,
    categoryIdx,
  }: {
    idxToStartReorderFrom: number;
    categoryIdx: number;
  }) {
    const category = this.categories.value[categoryIdx];
    const items = this.columns[categoryIdx].tasks;
    for (let i = idxToStartReorderFrom; i < items.length; i++) {
      const item = items[i];
      console.log(`item ${i} - order_id: ${i}`, item);
      this.onSubmitUpdateTask({ ...item, order_id: i + 1 });
    }
  }

  // ! Drag and Drop End

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private categoryService: CatergoryService,
    private itemService: ItemService
  ) {}

  onSubmitCategory() {
    this.categoryService
      .create(this.categoryForm.value)
      .pipe(takeUntil(this.unSub))
      .subscribe((res) => {
        this.boardService.init();
        this.onCancelCategory();
        this.boardService.init();
      });
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

  onCategoryMenuItemClick({ action, id }: { action: Actions; id: any }) {
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
        this.columns = columns;
        this.lists = columns.map((column) => new CategoryCardComponent());
      });
    this.boardService.init();

    this.categoryService.onCategoriesChange().subscribe((categories) => {
      this.categories.next(categories);
    });
  }

  taskAction({ action, item }: { action: Actions; item: unknown }) {
    switch (action) {
      case 'create':
        this.taskModal.header = 'Create Task';
        this.taskModal.task = { category_id: item } as any;
        this.taskModal.categories = this.categories.value;
        this.taskModal.mode = 'create';
        this.taskModal.open();
        break;
      case 'update':
        this.taskModal.header = 'Update Task';
        this.taskModal.task = item as IItem;
        this.taskModal.categories = this.categories.value;
        this.taskModal.mode = 'update';
        this.taskModal.open();
        break;
      case 'view':
        this.taskModal.header = 'View Task';
        this.taskModal.task = item as IItem;
        this.taskModal.categories = this.categories.value;
        this.taskModal.mode = 'view';
        this.taskModal.open();
        break;
      case 'delete':
        const confirm = window.confirm(
          'Are you sure you want to delete this task?'
        );
        if (confirm) this.onConfirmDeleteTask((item as IItem).id as string);
    }
  }

  taskActionSubmit({ action, task }: { action: Actions; task: unknown }) {
    switch (action) {
      case 'create':
        this.onSubmitCreateTask(task as CreateItem);
        break;
      case 'update':
        this.onSubmitUpdateTask(task);
        break;
    }
  }

  onSubmitCreateTask(task: CreateItem) {
    this.itemService.create(task).subscribe((res) => this.boardService.init());
  }

  onSubmitUpdateTask(task: Partial<IItem>) {
    const { id, item_id, ...body } = task;
    this.itemService
      .update(id, body as UpdateItem)
      .pipe(takeUntil(this.unSub))
      .subscribe((res) => this.boardService.init());
  }

  onConfirmDeleteTask(id: string) {
    this.itemService
      .delete(id)
      .pipe(takeUntil(this.unSub))
      .subscribe((res) => this.boardService.init());
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
