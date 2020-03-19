import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PressProductComponentsPage, { PressProductDeleteDialog } from './press-product.page-object';
import PressProductUpdatePage from './press-product-update.page-object';
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

describe('PressProduct e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pressProductComponentsPage: PressProductComponentsPage;
  let pressProductUpdatePage: PressProductUpdatePage;
  let pressProductDeleteDialog: PressProductDeleteDialog;
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

  it('should load PressProducts', async () => {
    await navBarPage.getEntityPage('press-product');
    pressProductComponentsPage = new PressProductComponentsPage();
    expect(await pressProductComponentsPage.title.getText()).to.match(/Press Products/);

    expect(await pressProductComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([pressProductComponentsPage.noRecords, pressProductComponentsPage.table]);

    beforeRecordsCount = (await isVisible(pressProductComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(pressProductComponentsPage.table);
  });

  it('should load create PressProduct page', async () => {
    await pressProductComponentsPage.createButton.click();
    pressProductUpdatePage = new PressProductUpdatePage();
    expect(await pressProductUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.pressProduct.home.createOrEditLabel/);
    await pressProductUpdatePage.cancel();
  });

  it('should create and save PressProducts', async () => {
    await pressProductComponentsPage.createButton.click();
    await pressProductUpdatePage.setOrderIdInput('5');
    expect(await pressProductUpdatePage.getOrderIdInput()).to.eq('5');
    await pressProductUpdatePage.setProductCodeInput('5');
    expect(await pressProductUpdatePage.getProductCodeInput()).to.eq('5');
    await pressProductUpdatePage.setQuatyInput('5');
    expect(await pressProductUpdatePage.getQuatyInput()).to.eq('5');
    await pressProductUpdatePage.setPriceEachInput('5');
    expect(await pressProductUpdatePage.getPriceEachInput()).to.eq('5');
    await pressProductUpdatePage.setPurchaseIdPurchaseInput('5');
    expect(await pressProductUpdatePage.getPurchaseIdPurchaseInput()).to.eq('5');
    await pressProductUpdatePage.idPrisionerSelectLastOption();
    await pressProductUpdatePage.idProductSelectLastOption();
    await waitUntilDisplayed(pressProductUpdatePage.saveButton);
    await pressProductUpdatePage.save();
    await waitUntilHidden(pressProductUpdatePage.saveButton);
    expect(await isVisible(pressProductUpdatePage.saveButton)).to.be.false;

    expect(await pressProductComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(pressProductComponentsPage.table);

    await waitUntilCount(pressProductComponentsPage.records, beforeRecordsCount + 1);
    expect(await pressProductComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PressProduct', async () => {
    const deleteButton = pressProductComponentsPage.getDeleteButton(pressProductComponentsPage.records.last());
    await click(deleteButton);

    pressProductDeleteDialog = new PressProductDeleteDialog();
    await waitUntilDisplayed(pressProductDeleteDialog.deleteModal);
    expect(await pressProductDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.pressProduct.delete.question/);
    await pressProductDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pressProductDeleteDialog.deleteModal);

    expect(await isVisible(pressProductDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([pressProductComponentsPage.noRecords, pressProductComponentsPage.table]);

    const afterCount = (await isVisible(pressProductComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(pressProductComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
