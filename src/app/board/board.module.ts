import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [BoardComponent, KanbanComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule, DragDropModule],
})
export class BoardModule {}
