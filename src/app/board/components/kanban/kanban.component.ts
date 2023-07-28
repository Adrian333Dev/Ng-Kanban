import {
  Subject,
  BehaviorSubject,
  combineLatest,
  forkJoin,
  mergeMap,
} from 'rxjs';
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

  handleDropInSameCategory({
    idxToStartReorderFrom,
    categoryIdx,
  }: {
    idxToStartReorderFrom: number;
    categoryIdx: number;
  }) {
    const items = this.columns[categoryIdx].tasks;

    combineLatest(
      items.slice(idxToStartReorderFrom).map((item, i) => {
        const { id, item_id, ...body } = item;
        return this.itemService.update(id, {
          ...body,
          order_id: i + idxToStartReorderFrom + 1,
        });
      })
    )
      .pipe(takeUntil(this.unSub))
      .subscribe(() => this.boardService.init());
  }

  handleDropInDifferentCategory({
    item,
    newCategoryId,
    newCategoryIdx,
    oldCategoryId,
    prevIdx,
    currIdx,
  }) {
    const { id, item_id, ...body } = item;
    const newCategoryTasks = this.columns[newCategoryIdx].tasks;
    const oldCategoryTasks =
      this.columns.find((column) => column.category.id === oldCategoryId)
        ?.tasks || [];

    // console.log('newCategoryTasks', newCategoryTasks);
    // console.log('oldCategoryTasks', oldCategoryTasks);
    // console.log('newCategoryId', newCategoryId);
    // console.log('oldCategoryId', oldCategoryId);

    this.itemService
      .update(id, {
        ...body,
        category_id: newCategoryId,
        order_id: currIdx + 1,
      })
      .subscribe(() => {
        // 1. reorder all items in the old category
        // 2. reorder items in the new category starting from the index after the dropped item

        // 1.
        combineLatest(
          oldCategoryTasks.map((item, i) => {
            const { id, item_id, ...body } = item;
            return this.itemService.update(id, {
              ...body,
              order_id: i + 1,
            });
          })
        ).subscribe(() => {
          // 2.
          combineLatest(
            newCategoryTasks.slice(currIdx + 1).map((item, i) => {
              const { id, item_id, ...body } = item;
              return this.itemService.update(id, {
                ...body,
                order_id: i + currIdx + 2,
              });
            })
          ).subscribe(() => this.boardService.init());
        });
      });
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
        // this.boardService.init();
        this.onCancelCategory();
        this.boardService.init();
      });
  }

  onSubmitEditCategory({
    category,
    fromIdx,
    toIdx,
  }: {
    category: UpdateCategory;
    fromIdx: number;
    toIdx: number;
  }) {
    const order_changed = fromIdx !== toIdx;
    if (order_changed) {
      const categoryInNewOrder = this.columns[toIdx - 1].category;
      const { id, category_title } = categoryInNewOrder;
      // update the category in the new order to the old order
      this.categoryService
        .update({ id, category_title, order_id: fromIdx })
        .pipe(takeUntil(this.unSub))
        .subscribe((res) => {
          // update the category in the old order to the new order
          this.categoryService
            .update({ ...category, order_id: toIdx })
            .pipe(takeUntil(this.unSub))
            .subscribe((res) => this.boardService.init());
        });
    } else
      this.categoryService
        .update(category)
        .pipe(takeUntil(this.unSub))
        .subscribe((res) => this.boardService.init());
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
    const colIdx = this.columns.findIndex(
      (column) => column.category.id === id
    );
    const col = this.columns[colIdx];
    this.editCategoryModal.category = col.category;
    this.editCategoryModal.order = colIdx + 1;
    this.editCategoryModal.max = this.columns.length;

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
      for (let i = 0; i < categories.length; i++) {
        const { id, category_title } = categories[i];
        console.log(`category_id: ${id} - category_title: ${category_title}`);
      }
    });

    // combineLatest(
    //   this.columns.map(({ category: { id, category_title } }, i) =>
    //     this.categoryService.update({ id, category_title, order_id: i + 1 })
    //   )
    // ).subscribe();
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
