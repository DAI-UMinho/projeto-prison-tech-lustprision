import { Moment } from 'moment';
import { IPressProduct } from 'app/shared/model/press-product.model';

export interface IPurchase {
  id?: number;
  date?: Moment;
  purchaseTotal?: number;
  ids?: IPressProduct[];
  prisionerId?: number;
}

export const defaultValue: Readonly<IPurchase> = {};
