import { IPermission } from 'app/shared/model/permission.model';
import { ILogin } from 'app/shared/model/login.model';

export interface IAdminEmploy {
  id?: number;
  idAdminEmp?: number;
  nameAdminEmp?: string;
  loginUserName?: string;
  password?: string;
  permissionIdPermission?: number;
  idPermission?: IPermission;
  login?: ILogin;
}

export const defaultValue: Readonly<IAdminEmploy> = {};
