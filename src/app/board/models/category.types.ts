import { IUser } from 'src/app/user/models/user.types';

export interface ICategory {
  id: string;
  name: string;
  category_id: string;
  category_title: string;
  created_date: string | Date;
  user_accesses: IUser[];
  order_id: number;
}

export interface ICategoryList {
  message: string;
  categories: ICategory[];
}

export type CreateCategory = Pick<ICategory, 'category_title'>;

export type UpdateCategory = Pick<
  ICategory,
  'id' | 'category_title' | 'order_id'
>;
