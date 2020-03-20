import { IPrisioner } from 'app/shared/model/prisioner.model';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';

export interface ILogin {
  id?: number;
  userName?: string;
  password?: string;
  type?: string;
  userNames?: IPrisioner[];
  userNames?: ISystemAdmin[];
  userNames?: IAdminEmploy[];
}

export const defaultValue: Readonly<ILogin> = {};
