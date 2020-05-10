import { Moment } from 'moment';
import { IPressWork } from 'app/shared/model/press-work.model';
import { IState } from 'app/shared/model/state.model';

export interface IWork {
  id?: number;
  nameWork?: string;
  totalCredits?: number;
  numRemainingEntries?: number;
  date?: Moment;
  ids?: IPressWork[];
  state?: IState[];
  stateID?: number;
  pressProductId?: number;
}

export const defaultValue: Readonly<IWork> = {};
