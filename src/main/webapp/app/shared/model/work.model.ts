import { IPressWork } from 'app/shared/model/press-work.model';

export interface IWork {
  id?: number;
  idWork?: number;
  nameWork?: string;
  priceHour?: number;
  numVacancies?: number;
  idWorks?: IPressWork[];
}

export const defaultValue: Readonly<IWork> = {};
