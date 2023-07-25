import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  CreateUser,
  IUser,
  IUserList,
  UpdateUser,
} from 'src/app/user/models/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.url + 'user/';

  constructor(private http: HttpClient) {}

  public list() {
    return this.http.get<IUserList>(this.apiUrl + 'list/');
  }

  public getCurrentUser() {
    // find the current user in the list of users by username or email
    return this.list().pipe(
      map((users) => {
        const currentUser = users.list.find(
          (user) => user.username === localStorage.getItem('username')
        );
        return currentUser;
      }
      )
    );
  }

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
