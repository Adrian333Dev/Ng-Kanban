import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './components/update/update.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent, pathMatch: 'full' },
  { path: 'update', component: UpdateComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
