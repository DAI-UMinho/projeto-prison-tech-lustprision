import { ILogin } from 'app/shared/model/login.model';
import { IPermission } from 'app/shared/model/permission.model';

export interface ISystemAdmin {
  id?: number;
  nameAdmin?: string;
  password?: string;
  login?: ILogin;
  permission?: IPermission;
}

export const defaultValue: Readonly<ISystemAdmin> = {};
