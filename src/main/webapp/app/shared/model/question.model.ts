import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';

export interface IQuestion {
  id?: number;
  question?: string;
  value?: number;
  answer?: string;
  wrongAnswer1?: string;
  wrongAnswer2?: string;
  wrongAnswer3?: string;
  ids?: IQuestionQuiz[];
}

export const defaultValue: Readonly<IQuestion> = {};
