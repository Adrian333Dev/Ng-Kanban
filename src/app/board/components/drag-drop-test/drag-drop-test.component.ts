import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface IItem {
  name: string;
}

@Component({
  selector: 'drag-drop-test',
  templateUrl: './drag-drop-test.component.html',
  styleUrls: ['./drag-drop-test.component.scss'],
})
export class DragDropTestComponent implements OnInit {
  items: IItem[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
  ];

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<IItem[]>) {
    console.log('event: ', event);
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

  onSubmit(newItemForm: NgForm) {
    this.items.push({ name: newItemForm.value.name });
    newItemForm.reset();
  }
}
