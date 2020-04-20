import { Moment } from 'moment';
import { IPressWork } from 'app/shared/model/press-work.model';

export interface IWork {
  id?: number;
  nameWork?: string;
  priceHour?: number;
  numVacancies?: number;
  date?: Moment;
  ids?: IPressWork[];
  stateId?: number;
}

export const defaultValue: Readonly<IWork> = {};
