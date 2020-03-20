import { Moment } from 'moment';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { IWork } from 'app/shared/model/work.model';

export interface IPressWork {
  id?: number;
  workDate?: Moment;
  prisioner?: IPrisioner;
  work?: IWork;
}

export const defaultValue: Readonly<IPressWork> = {};
