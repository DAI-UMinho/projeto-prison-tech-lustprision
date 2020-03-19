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
}

export const defaultValue: Readonly<IProduct> = {};
