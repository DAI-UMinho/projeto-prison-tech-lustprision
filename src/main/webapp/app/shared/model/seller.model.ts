import { IProduct } from 'app/shared/model/product.model';

export interface ISeller {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export const defaultValue: Readonly<ISeller> = {};
