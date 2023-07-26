import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { SharedModule } from '../shared/shared.module';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [BoardComponent, KanbanComponent, TaskModalComponent, TaskCardComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
