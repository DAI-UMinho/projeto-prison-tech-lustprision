import { Moment } from 'moment';
import { IPressWork } from 'app/shared/model/press-work.model';
import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { IPurchase } from 'app/shared/model/purchase.model';
import { IPermission } from 'app/shared/model/permission.model';

export interface IPrisioner {
  id?: number;
  name?: string;
  bi?: number;
  image?: string;
  numPrisioner?: number;
  numCell?: number;
  dataNascimento?: Moment;
  balance?: number;
  working?: number;
  profileImageContentType?: string;
  profileImage?: any;
  nfcCode?: number;
  codigoCartao?: number;
  pressWork?: IPressWork[];
  prisQuiz?: IPrisQuiz[];
  purchase?: IPurchase[];
  permission?: IPermission;
}

export const defaultValue: Readonly<IPrisioner> = {};
