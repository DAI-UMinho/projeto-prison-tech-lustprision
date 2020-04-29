import { Moment } from 'moment';
import { IPressWork } from 'app/shared/model/press-work.model';
import { IState } from 'app/shared/model/state.model';

export interface IWork {
  id?: number;
  nameWork?: string;
  priceHour?: number;
  numRemainingEntries?: number;
  date?: Moment;
  ids?: IPressWork[];
  state?: IState[];
  stateId?: number;
}

export const defaultValue: Readonly<IWork> = {};
