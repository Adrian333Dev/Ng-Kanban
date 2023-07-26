import { IUser } from 'src/app/user/models/user.types';

export interface ICategory {
  id: string;
  name: string;
  category_id: string;
  category_title: string;
  created_date: string | Date;
  user_accesses: IUser[];
}

export interface ICategoryList {
  message: string;
  categories: {
    [key: string]: ICategory;
  };
}

export type CreateCategory = Pick<ICategory, 'name' | 'category_title'>;

export type UpdateCategory = Partial<CreateCategory>;
