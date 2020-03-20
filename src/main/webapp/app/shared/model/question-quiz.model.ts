import { IQuiz } from 'app/shared/model/quiz.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionQuiz {
  id?: number;
  questionQuizId?: number;
  quiz?: IQuiz;
  question?: IQuestion;
}

export const defaultValue: Readonly<IQuestionQuiz> = {};
