import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import prisioner, {
  PrisionerState
} from 'app/modules/account/prisoner/prisioner.reducer';
// prettier-ignore
import pressWork, {
  PressWorkState
} from 'app/entities/press-work/press-work.reducer';
// prettier-ignore
import prisQuiz, {
  PrisQuizState
} from 'app/entities/pris-quiz/pris-quiz.reducer';
// prettier-ignore
import questionQuiz, {
  QuestionQuizState
} from 'app/entities/question-quiz/question-quiz.reducer';
// prettier-ignore
import pressProduct, {
  PressProductState
} from 'app/entities/press-product/press-product.reducer';
// prettier-ignore
import work, {
  WorkState
} from 'app/entities/work/work.reducer';
// prettier-ignore
import quiz, {
  QuizState
} from 'app/entities/quiz/quiz.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import purchase, {
  PurchaseState
} from 'app/modules/account/prisoner/purchase.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/modules/products/product.reducer';
// prettier-ignore
import login, {
  LoginState
} from 'app/entities/login/login.reducer';
// prettier-ignore
import permission, {
  PermissionState
} from 'app/entities/permission/permission.reducer';
// prettier-ignore
import systemAdmin, {
  SystemAdminState
} from 'app/entities/system-admin/system-admin.reducer';
// prettier-ignore
import adminEmploy, {
  AdminEmployState
} from 'app/entities/admin-employ/admin-employ.reducer';
// prettier-ignore
// prettier-ignore
/*import prisioner, {
  PrisionerState
} from 'app/entities/prisioner/prisioner.reducer';*/
// prettier-ignore
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly prisioner: PrisionerState;
  readonly pressWork: PressWorkState;
  readonly prisQuiz: PrisQuizState;
  readonly questionQuiz: QuestionQuizState;
  readonly pressProduct: PressProductState;
  readonly work: WorkState;
  readonly quiz: QuizState;
  readonly question: QuestionState;
  readonly purchase: PurchaseState;
  readonly product: ProductState;
  readonly login: LoginState;
  readonly permission: PermissionState;
  readonly systemAdmin: SystemAdminState;
  readonly adminEmploy: AdminEmployState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  prisioner,
  pressWork,
  prisQuiz,
  questionQuiz,
  pressProduct,
  work,
  quiz,
  question,
  purchase,
  product,
  login,
  permission,
  systemAdmin,
  adminEmploy,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
