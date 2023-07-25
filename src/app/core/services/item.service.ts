import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  IItem,
  IItemList,
  CreateItem,
  UpdateItem,
} from 'src/app/board/models/item.types';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly apiUrl = environment.url + 'item/';

  constructor(private http: HttpClient) {}

  public list() {
    return this.http.get<IItemList>(this.apiUrl + 'list/');
  }

  public get(id: number) {
    return this.http.get<IItem>(this.apiUrl + `get/${id}/`);
  }

  public create(body: CreateItem) {
    return this.http.post<{ message: string }>(this.apiUrl + 'create/', body);
  }

  public update(id: number, body: UpdateItem) {
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
}
