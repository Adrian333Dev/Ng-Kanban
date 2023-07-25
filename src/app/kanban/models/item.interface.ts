import { IUser } from 'src/app/user/models/user.interface';
import { ICategory } from './category.interface';

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
