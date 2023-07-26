import { IUser } from 'src/app/user/models/user.types';
import { ICategory } from './category.types';

export interface IItem {
  id: string;
  item_id: string;
  item_title: string;
  item_description: string;
  order_id: string;
  created_date: string | Date;
  owner: IUser;
  category: ICategory;
}

export interface IItemList {
  message: string;
  items: {
    [key: string]: IItem;
  };
}

export type CreateItem = Pick<IItem, 'item_title' | 'item_description'> & {
  category_id: number;
};

export type UpdateItem = Partial<CreateItem & { item_id: string }>;
