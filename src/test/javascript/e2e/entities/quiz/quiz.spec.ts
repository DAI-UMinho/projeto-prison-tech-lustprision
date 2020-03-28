import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuizComponentsPage, { QuizDeleteDialog } from './quiz.page-object';
import QuizUpdatePage from './quiz-update.page-object';
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

describe('Quiz e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let quizComponentsPage: QuizComponentsPage;
  let quizUpdatePage: QuizUpdatePage;
  let quizDeleteDialog: QuizDeleteDialog;
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

  it('should load Quizzes', async () => {
    await navBarPage.getEntityPage('quiz');
    quizComponentsPage = new QuizComponentsPage();
    expect(await quizComponentsPage.title.getText()).to.match(/Quizzes/);

    expect(await quizComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([quizComponentsPage.noRecords, quizComponentsPage.table]);

    beforeRecordsCount = (await isVisible(quizComponentsPage.noRecords)) ? 0 : await getRecordsCount(quizComponentsPage.table);
  });

  it('should load create Quiz page', async () => {
    await quizComponentsPage.createButton.click();
    quizUpdatePage = new QuizUpdatePage();
    expect(await quizUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.quiz.home.createOrEditLabel/);
    await quizUpdatePage.cancel();
  });

  it('should create and save Quizzes', async () => {
    await quizComponentsPage.createButton.click();
    await quizUpdatePage.setQtyQuestionInput('5');
    expect(await quizUpdatePage.getQtyQuestionInput()).to.eq('5');
    await waitUntilDisplayed(quizUpdatePage.saveButton);
    await quizUpdatePage.save();
    await waitUntilHidden(quizUpdatePage.saveButton);
    expect(await isVisible(quizUpdatePage.saveButton)).to.be.false;

    expect(await quizComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(quizComponentsPage.table);

    await waitUntilCount(quizComponentsPage.records, beforeRecordsCount + 1);
    expect(await quizComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Quiz', async () => {
    const deleteButton = quizComponentsPage.getDeleteButton(quizComponentsPage.records.last());
    await click(deleteButton);

    quizDeleteDialog = new QuizDeleteDialog();
    await waitUntilDisplayed(quizDeleteDialog.deleteModal);
    expect(await quizDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.quiz.delete.question/);
    await quizDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(quizDeleteDialog.deleteModal);

    expect(await isVisible(quizDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([quizComponentsPage.noRecords, quizComponentsPage.table]);

    const afterCount = (await isVisible(quizComponentsPage.noRecords)) ? 0 : await getRecordsCount(quizComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
