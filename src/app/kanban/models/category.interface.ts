import { IUser } from 'src/app/user/models/user.interface';

export interface ICategory {
  id: string;
  name: string;
  category_id: string;
  category_title: string;
  created_date: string | Date;
  user_accesses: IUser[];
}
