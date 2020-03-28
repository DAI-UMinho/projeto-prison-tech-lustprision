import { IPrisioner } from 'app/shared/model/prisioner.model';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';

export interface IPermission {
  id?: number;
  descPermission?: string;
  ids?: IPrisioner[];
  ids?: ISystemAdmin[];
  ids?: IAdminEmploy[];
}

export const defaultValue: Readonly<IPermission> = {};
