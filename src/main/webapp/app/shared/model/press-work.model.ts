import { Moment } from 'moment';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { IWork } from 'app/shared/model/work.model';
import { IState } from 'app/shared/model/state.model';

export interface IPressWork {
  id?: number;
  workDate?: Moment;
  prisioner?: IPrisioner;
  work?: IWork;
  state?: IState;
}

export const defaultValue: Readonly<IPressWork> = {};
