export interface IWork {
  id?: number;
  idWork?: number;
  nameWork?: string;
  priceHour?: number;
  numVacancies?: number;
}

export const defaultValue: Readonly<IWork> = {};
