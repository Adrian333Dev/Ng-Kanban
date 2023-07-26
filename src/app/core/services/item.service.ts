import { map } from 'rxjs/operators';
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
    return this.http
      .get<IItemList>(this.apiUrl + 'list/')
      .pipe(
        map(({ items, ...rest }) => ({
          items: Object.values(items ?? {}),
          ...rest,
        }))
      );
  }

  public get(id: string) {
    return this.http.get<IItem>(this.apiUrl + `get/${id}/`);
  }

  public create(body: CreateItem) {
    return this.http.post<{ message: string }>(this.apiUrl + 'create/', body);
  }

  public update(id: string, body: UpdateItem) {
    return this.http.put<{ message: string }>(
      this.apiUrl + `update/${id}/`,
      body
    );
  }

  public delete(id: string) {
    return this.http.delete<{ message?: string; detail?: string }>(
      this.apiUrl + `delete/${id}/`
    );
  }
}
