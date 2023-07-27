export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserResponse extends Pick<IUser, 'id' | 'username'> {}

export interface ChangePassword
  extends Pick<IUser, 'id' | 'password' | 'username'> {}

export interface IUserList {
  list: UserResponse[];
}

export type CreateUser = Omit<IUser, 'id'>;
export type UpdateUser = Partial<CreateUser>;
