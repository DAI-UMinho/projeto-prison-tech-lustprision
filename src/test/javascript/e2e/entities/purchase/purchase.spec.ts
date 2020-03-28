import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PurchaseComponentsPage, { PurchaseDeleteDialog } from './purchase.page-object';
import PurchaseUpdatePage from './purchase-update.page-object';
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

describe('Purchase e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchaseComponentsPage: PurchaseComponentsPage;
  let purchaseUpdatePage: PurchaseUpdatePage;
  let purchaseDeleteDialog: PurchaseDeleteDialog;
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

  it('should load Purchases', async () => {
    await navBarPage.getEntityPage('purchase');
    purchaseComponentsPage = new PurchaseComponentsPage();
    expect(await purchaseComponentsPage.title.getText()).to.match(/Purchases/);

    expect(await purchaseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([purchaseComponentsPage.noRecords, purchaseComponentsPage.table]);

    beforeRecordsCount = (await isVisible(purchaseComponentsPage.noRecords)) ? 0 : await getRecordsCount(purchaseComponentsPage.table);
  });

  it('should load create Purchase page', async () => {
    await purchaseComponentsPage.createButton.click();
    purchaseUpdatePage = new PurchaseUpdatePage();
    expect(await purchaseUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.purchase.home.createOrEditLabel/);
    await purchaseUpdatePage.cancel();
  });

  it('should create and save Purchases', async () => {
    await purchaseComponentsPage.createButton.click();
    await purchaseUpdatePage.prisionerSelectLastOption();
    await waitUntilDisplayed(purchaseUpdatePage.saveButton);
    await purchaseUpdatePage.save();
    await waitUntilHidden(purchaseUpdatePage.saveButton);
    expect(await isVisible(purchaseUpdatePage.saveButton)).to.be.false;

    expect(await purchaseComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(purchaseComponentsPage.table);

    await waitUntilCount(purchaseComponentsPage.records, beforeRecordsCount + 1);
    expect(await purchaseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Purchase', async () => {
    const deleteButton = purchaseComponentsPage.getDeleteButton(purchaseComponentsPage.records.last());
    await click(deleteButton);

    purchaseDeleteDialog = new PurchaseDeleteDialog();
    await waitUntilDisplayed(purchaseDeleteDialog.deleteModal);
    expect(await purchaseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.purchase.delete.question/);
    await purchaseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(purchaseDeleteDialog.deleteModal);

    expect(await isVisible(purchaseDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([purchaseComponentsPage.noRecords, purchaseComponentsPage.table]);

    const afterCount = (await isVisible(purchaseComponentsPage.noRecords)) ? 0 : await getRecordsCount(purchaseComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
