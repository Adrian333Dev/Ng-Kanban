import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  CreateUser,
  UserResponse,
  IUserList,
  UpdateUser,
  IUser,
} from 'src/app/user/models/user.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.url + 'user/';
  private users = new BehaviorSubject<UserResponse[]>([]);

  constructor(private http: HttpClient) {}

  public onUsersChange() {
    return this.users.asObservable();
  }

  public setUsers(users: UserResponse[]) {
    this.users.next(users);
  }

  public list() {
    return this.http
      .get<UserResponse[]>(this.apiUrl + 'list/')
      .pipe(
        map((users) =>
          users.map((user) => ({ id: user[0], username: user[1] }))
        )
      );
  }

  public getCurrentUser() {}

  public get(id: number) {
    return this.http.get<IUser>(this.apiUrl + `get/${id}/`);
  }

  public create(body: CreateUser) {
    return this.http.post<{ message: string }>(this.apiUrl + 'create/', body);
  }

  public update(id: number, body: UpdateUser) {
    return this.http.put<{ message: string }>(
      this.apiUrl + `update/${id}/`,
      body
    );
  }

  public delete(id: number) {
    return this.http.delete<{ message?: string; detail?: string }>(
      this.apiUrl + `delete/${id}/`
    );
  }

  public changePassword(id: number, body: { password: string }) {
    return this.http.put<{ message?: string; detail?: string }>(
      this.apiUrl + `change_password/${id}/`,
      body
    );
  }
}
