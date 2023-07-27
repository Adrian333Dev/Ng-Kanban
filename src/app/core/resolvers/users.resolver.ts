import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';
import { of, tap } from 'rxjs';
import { IUser } from 'src/app/user/models/user.types';

export const usersResolver: ResolveFn<any> = () => {
  const authService = inject(AuthService);
  const settingsService = inject(SettingsService);
  const userService = inject(UserService);

  if (authService.isLoggedIn()) {
    return userService.list().pipe(
      tap((users) => {
        const username = settingsService.usernameFromStorage;
        const userId = users.find((user) => user.username === username)?.id;
        userService
          .get(userId)
          .subscribe((user: IUser) => (settingsService.currentUser = user));
        userService.setUsers(users);
      })
    );
  }

  return of(null);
};
