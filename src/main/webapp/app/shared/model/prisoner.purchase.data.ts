export interface IPurchaseData {
  id?: number;
  date?: Date;
  purchaseTotal?: number;
}

export const defaultValue: Readonly<IPurchaseData> = {};
