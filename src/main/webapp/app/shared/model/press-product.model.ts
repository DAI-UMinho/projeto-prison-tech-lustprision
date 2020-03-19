import { IPurchase } from 'app/shared/model/purchase.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IPressProduct {
  id?: number;
  orderId?: number;
  productCode?: number;
  quaty?: number;
  priceEach?: number;
  purchaseIdPurchase?: number;
  idPrisioner?: IPurchase;
  idProduct?: IProduct;
}

export const defaultValue: Readonly<IPressProduct> = {};
