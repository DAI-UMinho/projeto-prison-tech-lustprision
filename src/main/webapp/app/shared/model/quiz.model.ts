export interface IQuiz {
  id?: number;
  idQuiz?: number;
  questQuizId?: number;
  qtyQuestion?: number;
}

export const defaultValue: Readonly<IQuiz> = {};
