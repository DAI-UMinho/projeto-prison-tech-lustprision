import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkComponentsPage, { WorkDeleteDialog } from './work.page-object';
import WorkUpdatePage from './work-update.page-object';
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

describe('Work e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workComponentsPage: WorkComponentsPage;
  let workUpdatePage: WorkUpdatePage;
  let workDeleteDialog: WorkDeleteDialog;
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

  it('should load Works', async () => {
    await navBarPage.getEntityPage('work');
    workComponentsPage = new WorkComponentsPage();
    expect(await workComponentsPage.title.getText()).to.match(/Works/);

    expect(await workComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([workComponentsPage.noRecords, workComponentsPage.table]);

    beforeRecordsCount = (await isVisible(workComponentsPage.noRecords)) ? 0 : await getRecordsCount(workComponentsPage.table);
  });

  it('should load create Work page', async () => {
    await workComponentsPage.createButton.click();
    workUpdatePage = new WorkUpdatePage();
    expect(await workUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.work.home.createOrEditLabel/);
    await workUpdatePage.cancel();
  });

  it('should create and save Works', async () => {
    await workComponentsPage.createButton.click();
    await workUpdatePage.setNameWorkInput('nameWork');
    expect(await workUpdatePage.getNameWorkInput()).to.match(/nameWork/);
    await workUpdatePage.setPriceHourInput('5');
    expect(await workUpdatePage.getPriceHourInput()).to.eq('5');
    await workUpdatePage.setNumVacanciesInput('5');
    expect(await workUpdatePage.getNumVacanciesInput()).to.eq('5');
    await workUpdatePage.setDateInput('01-01-2001');
    expect(await workUpdatePage.getDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(workUpdatePage.saveButton);
    await workUpdatePage.save();
    await waitUntilHidden(workUpdatePage.saveButton);
    expect(await isVisible(workUpdatePage.saveButton)).to.be.false;

    expect(await workComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(workComponentsPage.table);

    await waitUntilCount(workComponentsPage.records, beforeRecordsCount + 1);
    expect(await workComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Work', async () => {
    const deleteButton = workComponentsPage.getDeleteButton(workComponentsPage.records.last());
    await click(deleteButton);

    workDeleteDialog = new WorkDeleteDialog();
    await waitUntilDisplayed(workDeleteDialog.deleteModal);
    expect(await workDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.work.delete.question/);
    await workDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(workDeleteDialog.deleteModal);

    expect(await isVisible(workDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([workComponentsPage.noRecords, workComponentsPage.table]);

    const afterCount = (await isVisible(workComponentsPage.noRecords)) ? 0 : await getRecordsCount(workComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
