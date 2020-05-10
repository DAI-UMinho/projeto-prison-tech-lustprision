import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';

export interface IQuiz {
  id?: number;
  qtyQuestion?: number;
  prisQuiz?: IPrisQuiz[];
  questionQuiz?: IQuestionQuiz[];
}

export const defaultValue: Readonly<IQuiz> = {};
