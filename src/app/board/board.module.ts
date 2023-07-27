import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { SharedModule } from '../shared/shared.module';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { DragDropTestComponent } from './components/drag-drop-test/drag-drop-test.component';
import { DragDropTestBoardComponent } from './components/drag-drop-test-board/drag-drop-test-board.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';

@NgModule({
  declarations: [
    BoardComponent,
    KanbanComponent,
    TaskModalComponent,
    TaskCardComponent,
    EditCategoryModalComponent,
    DragDropTestComponent,
    DragDropTestBoardComponent,
    CategoryCardComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
