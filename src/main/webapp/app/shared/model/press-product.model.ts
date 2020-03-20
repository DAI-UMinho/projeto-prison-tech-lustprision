import { IPurchase } from 'app/shared/model/purchase.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IPressProduct {
  id?: number;
  orderId?: number;
  qty?: number;
  priceEach?: number;
  purchase?: IPurchase;
  product?: IProduct;
}

export const defaultValue: Readonly<IPressProduct> = {};
