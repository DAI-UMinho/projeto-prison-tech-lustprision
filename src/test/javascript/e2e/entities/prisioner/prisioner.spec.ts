import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PrisionerComponentsPage, { PrisionerDeleteDialog } from './prisioner.page-object';
import PrisionerUpdatePage from './prisioner-update.page-object';
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

describe('Prisioner e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prisionerComponentsPage: PrisionerComponentsPage;
  let prisionerUpdatePage: PrisionerUpdatePage;
  let prisionerDeleteDialog: PrisionerDeleteDialog;
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

  it('should load Prisioners', async () => {
    await navBarPage.getEntityPage('prisioner');
    prisionerComponentsPage = new PrisionerComponentsPage();
    expect(await prisionerComponentsPage.title.getText()).to.match(/Prisioners/);

    expect(await prisionerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([prisionerComponentsPage.noRecords, prisionerComponentsPage.table]);

    beforeRecordsCount = (await isVisible(prisionerComponentsPage.noRecords)) ? 0 : await getRecordsCount(prisionerComponentsPage.table);
  });

  it('should load create Prisioner page', async () => {
    await prisionerComponentsPage.createButton.click();
    prisionerUpdatePage = new PrisionerUpdatePage();
    expect(await prisionerUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.prisioner.home.createOrEditLabel/);
    await prisionerUpdatePage.cancel();
  });

  it('should create and save Prisioners', async () => {
    await prisionerComponentsPage.createButton.click();
    await prisionerUpdatePage.setIdPrisionerInput('5');
    expect(await prisionerUpdatePage.getIdPrisionerInput()).to.eq('5');
    await prisionerUpdatePage.setNameInput('name');
    expect(await prisionerUpdatePage.getNameInput()).to.match(/name/);
    await prisionerUpdatePage.setBiInput('5');
    expect(await prisionerUpdatePage.getBiInput()).to.eq('5');
    await prisionerUpdatePage.setImageInput('image');
    expect(await prisionerUpdatePage.getImageInput()).to.match(/image/);
    await prisionerUpdatePage.setNumPrisionerInput('5');
    expect(await prisionerUpdatePage.getNumPrisionerInput()).to.eq('5');
    await prisionerUpdatePage.setNumCellInput('5');
    expect(await prisionerUpdatePage.getNumCellInput()).to.eq('5');
    await prisionerUpdatePage.setDataNascimentoInput('01-01-2001');
    expect(await prisionerUpdatePage.getDataNascimentoInput()).to.eq('2001-01-01');
    await prisionerUpdatePage.setBalanceInput('5');
    expect(await prisionerUpdatePage.getBalanceInput()).to.eq('5');
    await prisionerUpdatePage.setWorkingInput('5');
    expect(await prisionerUpdatePage.getWorkingInput()).to.eq('5');
    await prisionerUpdatePage.setPasswordInput('password');
    expect(await prisionerUpdatePage.getPasswordInput()).to.match(/password/);
    await prisionerUpdatePage.loginSelectLastOption();
    await prisionerUpdatePage.permissionSelectLastOption();
    await waitUntilDisplayed(prisionerUpdatePage.saveButton);
    await prisionerUpdatePage.save();
    await waitUntilHidden(prisionerUpdatePage.saveButton);
    expect(await isVisible(prisionerUpdatePage.saveButton)).to.be.false;

    expect(await prisionerComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(prisionerComponentsPage.table);

    await waitUntilCount(prisionerComponentsPage.records, beforeRecordsCount + 1);
    expect(await prisionerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Prisioner', async () => {
    const deleteButton = prisionerComponentsPage.getDeleteButton(prisionerComponentsPage.records.last());
    await click(deleteButton);

    prisionerDeleteDialog = new PrisionerDeleteDialog();
    await waitUntilDisplayed(prisionerDeleteDialog.deleteModal);
    expect(await prisionerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.prisioner.delete.question/);
    await prisionerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prisionerDeleteDialog.deleteModal);

    expect(await isVisible(prisionerDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([prisionerComponentsPage.noRecords, prisionerComponentsPage.table]);

    const afterCount = (await isVisible(prisionerComponentsPage.noRecords)) ? 0 : await getRecordsCount(prisionerComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
