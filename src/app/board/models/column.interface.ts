import { ICategory } from './category.types';
import { IItem } from './item.types';

export type Column = ICategory & {
  tasks: IItem[];
};
