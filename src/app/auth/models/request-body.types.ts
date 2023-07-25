import { IUser } from 'src/app/user/models/user.types';
export type LoginBody = Pick<IUser, 'username' | 'password'>;
