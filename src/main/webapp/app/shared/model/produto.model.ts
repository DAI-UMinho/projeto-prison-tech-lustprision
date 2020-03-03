export interface IProduto {
  id?: string;
  nome?: string;
  category?: string;
  price?: number;
}

export const defaultValue: Readonly<IProduto> = {};
