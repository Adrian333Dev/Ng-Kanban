import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  public columns = new BehaviorSubject<IColumn[]>([]);
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
    private categoryService: CatergoryService
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

  onMenuItemClick(action: Actions) {
    console.log(action);
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category_title: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.boardService
      .onColumnsChange()
      .pipe(takeUntil(this.unSub))
      .subscribe((columns) => {
        console.log(columns);
        this.columns.next(columns);
      });
    this.boardService.init();
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
