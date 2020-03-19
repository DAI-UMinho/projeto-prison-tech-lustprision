import { Moment } from 'moment';
import { IPurchase } from 'app/shared/model/purchase.model';
import { IPressWork } from 'app/shared/model/press-work.model';
import { IPermission } from 'app/shared/model/permission.model';
import { ILogin } from 'app/shared/model/login.model';

export interface IPrisioner {
  id?: number;
  idPrisioner?: number;
  name?: string;
  bi?: number;
  image?: string;
  numPrisioner?: number;
  numCell?: number;
  dataNascimento?: Moment;
  balance?: number;
  loginUserName?: string;
  permissinidPermission?: number;
  working?: number;
  password?: string;
  idPurchases?: IPurchase[];
  workIds?: IPressWork[];
  idPermission?: IPermission;
  login?: ILogin;
}

export const defaultValue: Readonly<IPrisioner> = {};
