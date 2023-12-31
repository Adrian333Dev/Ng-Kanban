import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { usersResolver } from './core/resolvers/users.resolver';

const routes: Routes = [
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
  {
    path: 'board',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    resolve: {
      users: usersResolver,
    },
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    resolve: {
      users: usersResolver,
    },
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
