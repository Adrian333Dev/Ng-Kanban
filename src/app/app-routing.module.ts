import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { KanbanComponent } from './kanban/kanban.component';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  {
    path: 'kanban',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./kanban/kanban.module').then((m) => m.KanbanModule),
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    component: LogInComponent,
  },
  {
    path: 'register',
    canActivate: [loginGuard],
    component: RegisterComponent,
  },
  { path: '', redirectTo: 'kanban', pathMatch: 'full' },
  { path: '**', redirectTo: 'kanban' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
