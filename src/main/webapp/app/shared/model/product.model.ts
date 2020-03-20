import { IPressProduct } from 'app/shared/model/press-product.model';

export interface IProduct {
  id?: number;
  codeProd?: number;
  productLinId?: number;
  nameProd?: string;
  price?: number;
  seler?: string;
  descriptionProd?: string;
  quantyInStock?: number;
  buyPrice?: number;
  codeProds?: IPressProduct[];
}

export const defaultValue: Readonly<IProduct> = {};
