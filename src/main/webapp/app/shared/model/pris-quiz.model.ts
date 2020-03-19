import { Moment } from 'moment';
import { IQuiz } from 'app/shared/model/quiz.model';
import { IPrisioner } from 'app/shared/model/prisioner.model';

export interface IPrisQuiz {
  id?: number;
  idPrisioner?: number;
  idQuiz?: number;
  quizDate?: Moment;
  idQuiz?: IQuiz;
  idPrisioner?: IPrisioner;
}

export const defaultValue: Readonly<IPrisQuiz> = {};
