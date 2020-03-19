import { IQuiz } from 'app/shared/model/quiz.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionQuiz {
  id?: number;
  questionQuizId?: number;
  idQuiz?: number;
  idQuestion?: number;
  idQuiz?: IQuiz;
  idQuestion?: IQuestion;
}

export const defaultValue: Readonly<IQuestionQuiz> = {};
