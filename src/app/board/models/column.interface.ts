import { ICategory } from './category.types';
import { IItem } from './item.types';

export interface IColumn
  extends Pick<ICategory, 'id' | 'category_id' | 'category_title'> {
  tasks: Partial<IItem>[];
}
