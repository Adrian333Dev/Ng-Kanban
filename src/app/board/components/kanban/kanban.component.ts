import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';

import { mockData } from './../../constants';
import { IColumn } from '../../models/column.interface';
import { BoardService } from 'src/app/core/services/board.service';

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
  // data = mockData;

  constructor(private fb: FormBuilder, private boardService: BoardService) {}

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
      console.log('onSubmitCategory', this.categoryForm.value);
      this.categoryForm.reset();
      this.creatingCategory = false;
    } else this.categoryForm.markAllAsTouched();
  }

  onCancelCategory() {
    this.categoryForm.reset();
    this.creatingCategory = false;
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
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
