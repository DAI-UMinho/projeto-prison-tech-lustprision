import { IWork } from 'app/shared/model/work.model';
import { IPrisioner } from 'app/shared/model/prisioner.model';

export interface IPressWork {
  id?: number;
  prisionerId?: number;
  workId?: number;
  idWork?: IWork;
  prisioner?: IPrisioner;
}

export const defaultValue: Readonly<IPressWork> = {};
