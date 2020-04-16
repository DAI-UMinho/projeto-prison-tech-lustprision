import { Moment } from 'moment';

export interface IAdminEmploy {
  id?: number;
  nameAdminEmp?: string;
  email?: string;
  activated?: boolean;
  actitionKey?: string;
  resetKey?: string;
  resetDate?: Moment;
}

export const defaultValue: Readonly<IAdminEmploy> = {
  activated: false
};
