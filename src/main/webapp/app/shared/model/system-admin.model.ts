import { IPermission } from 'app/shared/model/permission.model';
import { ILogin } from 'app/shared/model/login.model';

export interface ISystemAdmin {
  id?: number;
  idSysAdmin?: number;
  nameAdmin?: string;
  userNameAdmin?: string;
  password?: string;
  permissionIdPermission?: number;
  idPermission?: IPermission;
  login?: ILogin;
}

export const defaultValue: Readonly<ISystemAdmin> = {};
