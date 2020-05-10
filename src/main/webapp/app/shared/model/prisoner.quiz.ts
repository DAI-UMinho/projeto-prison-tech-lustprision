export interface IPrisonerQuiz {
  completed?: number;
  canceled?: number;
  creditsEarned?: number;
}

export const defaultValue: Readonly<IPrisonerQuiz> = {};
