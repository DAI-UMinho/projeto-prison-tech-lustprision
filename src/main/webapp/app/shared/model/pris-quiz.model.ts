import { Moment } from 'moment';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { IQuiz } from 'app/shared/model/quiz.model';

export interface IPrisQuiz {
  id?: number;
  quizDate?: Moment;
  approval?: number;
  prisioner?: IPrisioner;
  quiz?: IQuiz;
}

export const defaultValue: Readonly<IPrisQuiz> = {};
