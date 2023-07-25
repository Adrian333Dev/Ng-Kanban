import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/user/models/user.types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _currentUser = new BehaviorSubject<IUser>(null);

  constructor(private userService: UserService) {}

  public get currentUser() {
    return this._currentUser.value;
  }

  public get currentUserId() {
    return this.currentUser.id;
  }

  public set currentUser(user: IUser) {
    this._currentUser.next(user);
  }

  public onCurrentUserChange() {
    return this._currentUser.asObservable();
  }
}
