import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { KanbanComponent } from './components/kanban/kanban.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [{ path: '', component: KanbanComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
