import { Component, OnInit } from '@angular/core';
import { DragDropTestComponent } from '../drag-drop-test/drag-drop-test.component';

@Component({
  selector: 'drag-drop-test-board',
  templateUrl: './drag-drop-test-board.component.html',
  styleUrls: ['./drag-drop-test-board.component.scss'],
})
export class DragDropTestBoardComponent implements OnInit {
  lists: DragDropTestComponent[] = [];

  constructor() {}

  ngOnInit(): void {}

  addList() {
    var newList = new DragDropTestComponent();
    this.lists.push(newList);
  }
}
