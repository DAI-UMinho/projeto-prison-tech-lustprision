import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';

export interface IQuiz {
  id?: number;
  qtyQuestion?: number;
  ids?: IPrisQuiz[];
  ids?: IQuestionQuiz[];
}

export const defaultValue: Readonly<IQuiz> = {};
