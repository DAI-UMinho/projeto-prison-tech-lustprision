import { IPressProduct } from 'app/shared/model/press-product.model';
import { IPrisioner } from 'app/shared/model/prisioner.model';

export interface IPurchase {
  id?: number;
  idPurchase?: number;
  idPurchases?: IPressProduct[];
  prisioner?: IPrisioner;
}

export const defaultValue: Readonly<IPurchase> = {};
