import { IUser } from 'src/app/user/models/user.interface';

export type RegisterBody = Omit<IUser, 'id'>;

export type LoginBody = Pick<IUser, 'username' | 'password'>;
