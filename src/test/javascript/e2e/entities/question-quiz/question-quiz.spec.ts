import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestionQuizComponentsPage, { QuestionQuizDeleteDialog } from './question-quiz.page-object';
import QuestionQuizUpdatePage from './question-quiz-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('QuestionQuiz e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionQuizComponentsPage: QuestionQuizComponentsPage;
  let questionQuizUpdatePage: QuestionQuizUpdatePage;
  let questionQuizDeleteDialog: QuestionQuizDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load QuestionQuizs', async () => {
    await navBarPage.getEntityPage('question-quiz');
    questionQuizComponentsPage = new QuestionQuizComponentsPage();
    expect(await questionQuizComponentsPage.title.getText()).to.match(/Question Quizs/);

    expect(await questionQuizComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([questionQuizComponentsPage.noRecords, questionQuizComponentsPage.table]);

    beforeRecordsCount = (await isVisible(questionQuizComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(questionQuizComponentsPage.table);
  });

  it('should load create QuestionQuiz page', async () => {
    await questionQuizComponentsPage.createButton.click();
    questionQuizUpdatePage = new QuestionQuizUpdatePage();
    expect(await questionQuizUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.questionQuiz.home.createOrEditLabel/);
    await questionQuizUpdatePage.cancel();
  });

  it('should create and save QuestionQuizs', async () => {
    await questionQuizComponentsPage.createButton.click();
    await questionQuizUpdatePage.setQuestionAnswerInput('questionAnswer');
    expect(await questionQuizUpdatePage.getQuestionAnswerInput()).to.match(/questionAnswer/);
    await questionQuizUpdatePage.quizSelectLastOption();
    await questionQuizUpdatePage.questionSelectLastOption();
    await waitUntilDisplayed(questionQuizUpdatePage.saveButton);
    await questionQuizUpdatePage.save();
    await waitUntilHidden(questionQuizUpdatePage.saveButton);
    expect(await isVisible(questionQuizUpdatePage.saveButton)).to.be.false;

    expect(await questionQuizComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(questionQuizComponentsPage.table);

    await waitUntilCount(questionQuizComponentsPage.records, beforeRecordsCount + 1);
    expect(await questionQuizComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last QuestionQuiz', async () => {
    const deleteButton = questionQuizComponentsPage.getDeleteButton(questionQuizComponentsPage.records.last());
    await click(deleteButton);

    questionQuizDeleteDialog = new QuestionQuizDeleteDialog();
    await waitUntilDisplayed(questionQuizDeleteDialog.deleteModal);
    expect(await questionQuizDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.questionQuiz.delete.question/);
    await questionQuizDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(questionQuizDeleteDialog.deleteModal);

    expect(await isVisible(questionQuizDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([questionQuizComponentsPage.noRecords, questionQuizComponentsPage.table]);

    const afterCount = (await isVisible(questionQuizComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(questionQuizComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
