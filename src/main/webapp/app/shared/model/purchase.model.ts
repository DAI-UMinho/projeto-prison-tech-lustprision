import { IPrisioner } from 'app/shared/model/prisioner.model';

export interface IPurchase {
  id?: number;
  idPurchase?: number;
  prisionerId?: number;
  prisioner?: IPrisioner;
}

export const defaultValue: Readonly<IPurchase> = {};
