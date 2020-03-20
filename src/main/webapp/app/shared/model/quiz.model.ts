import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';

export interface IQuiz {
  id?: number;
  idQuiz?: number;
  qtyQuestion?: number;
  idQuizs?: IPrisQuiz[];
  idQuzs?: IQuestionQuiz[];
}

export const defaultValue: Readonly<IQuiz> = {};
