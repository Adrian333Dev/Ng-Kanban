import { IUser } from 'src/app/user/models/user.types';
import { ICategory } from './category.types';

export interface IItem {
  id: string;
  item_id: string;
  item_title: string;
  item_description: string;
  order_id: number;
  created_date: string | Date;
  owner_id: string;
  category_id: string;
}

export interface IItemList {
  message: string;
  items: {
    [key: string]: IItem;
  };
}

export type CreateItem = Pick<IItem, 'item_title' | 'item_description'> & {
  category_id: string;
};

export type UpdateItem = Pick<
  IItem,
  'item_title' | 'item_description' | 'order_id' | 'category_id'
>;
