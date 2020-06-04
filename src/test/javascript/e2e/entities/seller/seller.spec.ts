import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SellerComponentsPage, { SellerDeleteDialog } from './seller.page-object';
import SellerUpdatePage from './seller-update.page-object';
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

describe('Seller e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sellerComponentsPage: SellerComponentsPage;
  let sellerUpdatePage: SellerUpdatePage;
  let sellerDeleteDialog: SellerDeleteDialog;
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

  it('should load Sellers', async () => {
    await navBarPage.getEntityPage('seller');
    sellerComponentsPage = new SellerComponentsPage();
    expect(await sellerComponentsPage.title.getText()).to.match(/Sellers/);

    expect(await sellerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([sellerComponentsPage.noRecords, sellerComponentsPage.table]);

    beforeRecordsCount = (await isVisible(sellerComponentsPage.noRecords)) ? 0 : await getRecordsCount(sellerComponentsPage.table);
  });

  it('should load create Seller page', async () => {
    await sellerComponentsPage.createButton.click();
    sellerUpdatePage = new SellerUpdatePage();
    expect(await sellerUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.seller.home.createOrEditLabel/);
    await sellerUpdatePage.cancel();
  });

  it('should create and save Sellers', async () => {
    await sellerComponentsPage.createButton.click();
    await sellerUpdatePage.setNameInput('name');
    expect(await sellerUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(sellerUpdatePage.saveButton);
    await sellerUpdatePage.save();
    await waitUntilHidden(sellerUpdatePage.saveButton);
    expect(await isVisible(sellerUpdatePage.saveButton)).to.be.false;

    expect(await sellerComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(sellerComponentsPage.table);

    await waitUntilCount(sellerComponentsPage.records, beforeRecordsCount + 1);
    expect(await sellerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Seller', async () => {
    const deleteButton = sellerComponentsPage.getDeleteButton(sellerComponentsPage.records.last());
    await click(deleteButton);

    sellerDeleteDialog = new SellerDeleteDialog();
    await waitUntilDisplayed(sellerDeleteDialog.deleteModal);
    expect(await sellerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.seller.delete.question/);
    await sellerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(sellerDeleteDialog.deleteModal);

    expect(await isVisible(sellerDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([sellerComponentsPage.noRecords, sellerComponentsPage.table]);

    const afterCount = (await isVisible(sellerComponentsPage.noRecords)) ? 0 : await getRecordsCount(sellerComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
