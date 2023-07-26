import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  CreateCategory,
  ICategory,
  ICategoryList,
  UpdateCategory,
} from 'src/app/board/models/category.types';

@Injectable({
  providedIn: 'root',
})
export class CatergoryService {
  private readonly apiUrl = environment.url + 'category/';
  private categories = new BehaviorSubject<ICategory[]>([]);

  constructor(private http: HttpClient) {}

  public onCategoriesChange() {
    return this.categories.asObservable();
  }

  public setCategories(categories: ICategory[]) {
    this.categories.next(categories);
  }

  public list() {
    return this.http.get<ICategoryList>(this.apiUrl + 'list/').pipe(
      map(({ categories, ...rest }) => {
        const categoriesList = Object.values(categories ?? {});
        this.setCategories(categoriesList);
        return { categories: categoriesList, ...rest };
      })
    );
  }

  public get(id: number) {
    return this.http.get<ICategory>(this.apiUrl + `get/${id}/`);
  }

  public create(body: CreateCategory) {
    return this.http.post<{ message: string }>(this.apiUrl + 'create/', body);
  }

  public update(id: number, body: UpdateCategory) {
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
