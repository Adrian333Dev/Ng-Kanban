import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CatergoryService } from './catergory.service';
import { ItemService } from './item.service';
import { IColumn } from 'src/app/board/models/column.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private columns = new BehaviorSubject<IColumn[]>([]);
  constructor(
    private readonly categoryService: CatergoryService,
    private readonly itemService: ItemService
  ) {}

  public onColumnsChange() {
    return this.columns.asObservable();
  }

  public init() {
    combineLatest([
      this.categoryService.list().pipe(map(({ categories }) => categories)),
      this.itemService.list().pipe(map(({ items }) => items)),
    ]).subscribe(([categories, items]) => {
      if (!categories.length) return;
      const columnsMap = categories.reduce((acc, category) => {
        acc[category.id] = { ...category, items: [] };
        return acc;
      }, {});
      items.forEach((item) => columnsMap[item.category.id].items.push(item));
      const columns = Object.values(columnsMap) as IColumn[];
      this.columns.next(columns);
      console.log(columns);
    });
  }
}
