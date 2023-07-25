import { Injectable, inject } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { UserService } from '../services/user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CurrentUserResolver implements Resolve<boolean> {
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return of(true);
//   }
// }

// @deprecated
// Class-based Route resolvers are deprecated in favor of functional resolvers. An injectable class can be used as a functional guard using the inject function: resolve: {'user': () => inject(UserResolver).resolve()}.

export const currentUserResolver: ResolveFn<any> = () => {
  const authService = inject(AuthService);
  const settingsService = inject(SettingsService);
  const userService = inject(UserService);

  // if (authService.isLoggedIn()) {
  //   return userService.list().subscribe((users) => {
  // }
};
