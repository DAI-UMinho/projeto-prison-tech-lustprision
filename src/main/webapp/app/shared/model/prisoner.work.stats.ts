export interface IWorkStats {
  stateID?: number;
  totalCredits?: number;
  completed?: number;
  canceled?: number;
  creditsEarned?: number;
}

export const defaultValue: Readonly<IWorkStats> = {};
