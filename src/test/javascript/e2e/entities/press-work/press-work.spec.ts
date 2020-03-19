import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PressWorkComponentsPage, { PressWorkDeleteDialog } from './press-work.page-object';
import PressWorkUpdatePage from './press-work-update.page-object';
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

describe('PressWork e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pressWorkComponentsPage: PressWorkComponentsPage;
  let pressWorkUpdatePage: PressWorkUpdatePage;
  let pressWorkDeleteDialog: PressWorkDeleteDialog;
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

  it('should load PressWorks', async () => {
    await navBarPage.getEntityPage('press-work');
    pressWorkComponentsPage = new PressWorkComponentsPage();
    expect(await pressWorkComponentsPage.title.getText()).to.match(/Press Works/);

    expect(await pressWorkComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([pressWorkComponentsPage.noRecords, pressWorkComponentsPage.table]);

    beforeRecordsCount = (await isVisible(pressWorkComponentsPage.noRecords)) ? 0 : await getRecordsCount(pressWorkComponentsPage.table);
  });

  it('should load create PressWork page', async () => {
    await pressWorkComponentsPage.createButton.click();
    pressWorkUpdatePage = new PressWorkUpdatePage();
    expect(await pressWorkUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.pressWork.home.createOrEditLabel/);
    await pressWorkUpdatePage.cancel();
  });

  it('should create and save PressWorks', async () => {
    await pressWorkComponentsPage.createButton.click();
    await pressWorkUpdatePage.setPrisionerIdInput('5');
    expect(await pressWorkUpdatePage.getPrisionerIdInput()).to.eq('5');
    await pressWorkUpdatePage.setWorkIdInput('5');
    expect(await pressWorkUpdatePage.getWorkIdInput()).to.eq('5');
    await pressWorkUpdatePage.idWorkSelectLastOption();
    await pressWorkUpdatePage.prisionerSelectLastOption();
    await waitUntilDisplayed(pressWorkUpdatePage.saveButton);
    await pressWorkUpdatePage.save();
    await waitUntilHidden(pressWorkUpdatePage.saveButton);
    expect(await isVisible(pressWorkUpdatePage.saveButton)).to.be.false;

    expect(await pressWorkComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(pressWorkComponentsPage.table);

    await waitUntilCount(pressWorkComponentsPage.records, beforeRecordsCount + 1);
    expect(await pressWorkComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PressWork', async () => {
    const deleteButton = pressWorkComponentsPage.getDeleteButton(pressWorkComponentsPage.records.last());
    await click(deleteButton);

    pressWorkDeleteDialog = new PressWorkDeleteDialog();
    await waitUntilDisplayed(pressWorkDeleteDialog.deleteModal);
    expect(await pressWorkDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.pressWork.delete.question/);
    await pressWorkDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pressWorkDeleteDialog.deleteModal);

    expect(await isVisible(pressWorkDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([pressWorkComponentsPage.noRecords, pressWorkComponentsPage.table]);

    const afterCount = (await isVisible(pressWorkComponentsPage.noRecords)) ? 0 : await getRecordsCount(pressWorkComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
