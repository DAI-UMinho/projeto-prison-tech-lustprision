import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestionComponentsPage, { QuestionDeleteDialog } from './question.page-object';
import QuestionUpdatePage from './question-update.page-object';
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

describe('Question e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionComponentsPage: QuestionComponentsPage;
  let questionUpdatePage: QuestionUpdatePage;
  let questionDeleteDialog: QuestionDeleteDialog;
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

  it('should load Questions', async () => {
    await navBarPage.getEntityPage('question');
    questionComponentsPage = new QuestionComponentsPage();
    expect(await questionComponentsPage.title.getText()).to.match(/Questions/);

    expect(await questionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([questionComponentsPage.noRecords, questionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(questionComponentsPage.noRecords)) ? 0 : await getRecordsCount(questionComponentsPage.table);
  });

  it('should load create Question page', async () => {
    await questionComponentsPage.createButton.click();
    questionUpdatePage = new QuestionUpdatePage();
    expect(await questionUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.question.home.createOrEditLabel/);
    await questionUpdatePage.cancel();
  });

  it('should create and save Questions', async () => {
    await questionComponentsPage.createButton.click();
    await questionUpdatePage.setQuestionInput('question');
    expect(await questionUpdatePage.getQuestionInput()).to.match(/question/);
    await questionUpdatePage.setValueInput('5');
    expect(await questionUpdatePage.getValueInput()).to.eq('5');
    await questionUpdatePage.setAnswerInput('answer');
    expect(await questionUpdatePage.getAnswerInput()).to.match(/answer/);
    await waitUntilDisplayed(questionUpdatePage.saveButton);
    await questionUpdatePage.save();
    await waitUntilHidden(questionUpdatePage.saveButton);
    expect(await isVisible(questionUpdatePage.saveButton)).to.be.false;

    expect(await questionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(questionComponentsPage.table);

    await waitUntilCount(questionComponentsPage.records, beforeRecordsCount + 1);
    expect(await questionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Question', async () => {
    const deleteButton = questionComponentsPage.getDeleteButton(questionComponentsPage.records.last());
    await click(deleteButton);

    questionDeleteDialog = new QuestionDeleteDialog();
    await waitUntilDisplayed(questionDeleteDialog.deleteModal);
    expect(await questionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.question.delete.question/);
    await questionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(questionDeleteDialog.deleteModal);

    expect(await isVisible(questionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([questionComponentsPage.noRecords, questionComponentsPage.table]);

    const afterCount = (await isVisible(questionComponentsPage.noRecords)) ? 0 : await getRecordsCount(questionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
