import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrisQuizComponentsPage, { PrisQuizDeleteDialog } from './pris-quiz.page-object';
import PrisQuizUpdatePage from './pris-quiz-update.page-object';
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

describe('PrisQuiz e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prisQuizComponentsPage: PrisQuizComponentsPage;
  let prisQuizUpdatePage: PrisQuizUpdatePage;
  let prisQuizDeleteDialog: PrisQuizDeleteDialog;
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

  it('should load PrisQuizs', async () => {
    await navBarPage.getEntityPage('pris-quiz');
    prisQuizComponentsPage = new PrisQuizComponentsPage();
    expect(await prisQuizComponentsPage.title.getText()).to.match(/Pris Quizs/);

    expect(await prisQuizComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([prisQuizComponentsPage.noRecords, prisQuizComponentsPage.table]);

    beforeRecordsCount = (await isVisible(prisQuizComponentsPage.noRecords)) ? 0 : await getRecordsCount(prisQuizComponentsPage.table);
  });

  it('should load create PrisQuiz page', async () => {
    await prisQuizComponentsPage.createButton.click();
    prisQuizUpdatePage = new PrisQuizUpdatePage();
    expect(await prisQuizUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.prisQuiz.home.createOrEditLabel/);
    await prisQuizUpdatePage.cancel();
  });

  it('should create and save PrisQuizs', async () => {
    await prisQuizComponentsPage.createButton.click();
    await prisQuizUpdatePage.setQuizDateInput('01-01-2001');
    expect(await prisQuizUpdatePage.getQuizDateInput()).to.eq('2001-01-01');
    await prisQuizUpdatePage.setApprovalInput('5');
    expect(await prisQuizUpdatePage.getApprovalInput()).to.eq('5');
    await prisQuizUpdatePage.prisionerSelectLastOption();
    await prisQuizUpdatePage.quizSelectLastOption();
    await waitUntilDisplayed(prisQuizUpdatePage.saveButton);
    await prisQuizUpdatePage.save();
    await waitUntilHidden(prisQuizUpdatePage.saveButton);
    expect(await isVisible(prisQuizUpdatePage.saveButton)).to.be.false;

    expect(await prisQuizComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(prisQuizComponentsPage.table);

    await waitUntilCount(prisQuizComponentsPage.records, beforeRecordsCount + 1);
    expect(await prisQuizComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PrisQuiz', async () => {
    const deleteButton = prisQuizComponentsPage.getDeleteButton(prisQuizComponentsPage.records.last());
    await click(deleteButton);

    prisQuizDeleteDialog = new PrisQuizDeleteDialog();
    await waitUntilDisplayed(prisQuizDeleteDialog.deleteModal);
    expect(await prisQuizDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.prisQuiz.delete.question/);
    await prisQuizDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prisQuizDeleteDialog.deleteModal);

    expect(await isVisible(prisQuizDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([prisQuizComponentsPage.noRecords, prisQuizComponentsPage.table]);

    const afterCount = (await isVisible(prisQuizComponentsPage.noRecords)) ? 0 : await getRecordsCount(prisQuizComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
