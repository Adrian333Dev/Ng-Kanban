import { mockData } from './../../constants';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IColumn } from '../../models/column.interface';
import { IItem } from '../../models/item.types';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  public categoryForm: FormGroup;
  public creatingCategory = false;
  data = mockData;

  constructor(private fb: FormBuilder) {
    console.log('data', this.data);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
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
  }
}
