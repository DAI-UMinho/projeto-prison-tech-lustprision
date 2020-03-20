import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';

export interface IQuestion {
  id?: number;
  idQuestion?: number;
  question?: string;
  value?: number;
  answer?: string;
  idQuestions?: IQuestionQuiz[];
}

export const defaultValue: Readonly<IQuestion> = {};
