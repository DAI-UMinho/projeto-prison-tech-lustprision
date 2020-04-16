import { IPressProduct } from 'app/shared/model/press-product.model';

export interface IProduct {
  id?: number;
  productLinId?: number;
  nameProd?: string;
  price?: number;
  seler?: string;
  descriptionProd?: string;
  quantyInStock?: number;
  buyPrice?: number;
  imageContentType?: string;
  image?: any;
  ids?: IPressProduct[];
}

export const defaultValue: Readonly<IProduct> = {};
