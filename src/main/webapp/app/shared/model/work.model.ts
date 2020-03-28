import { IPressWork } from 'app/shared/model/press-work.model';

export interface IWork {
  id?: number;
  nameWork?: string;
  priceHour?: number;
  numVacancies?: number;
  ids?: IPressWork[];
}

export const defaultValue: Readonly<IWork> = {};
