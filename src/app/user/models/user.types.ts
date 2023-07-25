export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserList {
  list: IUser[];
}

export type CreateUser = Omit<IUser, 'id'>;
export type UpdateUser = Partial<CreateUser>;
