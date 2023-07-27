import { ICategory } from './category.types';
import { IItem } from './item.types';

export interface IColumn {
  category: ICategory;
  tasks: IItem[];
}
