import { IAdminEmploy } from 'app/shared/model/admin-employ.model';

export interface ILogin {
  id?: number;
  userName?: string;
  password?: string;
  type?: string;
  adminEmploy?: IAdminEmploy;
}

export const defaultValue: Readonly<ILogin> = {};
