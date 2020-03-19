export interface IQuestion {
  id?: number;
  idQuestion?: number;
  question?: string;
  value?: number;
  answer?: string;
}

export const defaultValue: Readonly<IQuestion> = {};
