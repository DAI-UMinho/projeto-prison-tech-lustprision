import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LoginComponentsPage, { LoginDeleteDialog } from './login.page-object';
import LoginUpdatePage from './login-update.page-object';
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

describe('Login e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let loginComponentsPage: LoginComponentsPage;
  let loginUpdatePage: LoginUpdatePage;
  let loginDeleteDialog: LoginDeleteDialog;
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

  it('should load Logins', async () => {
    await navBarPage.getEntityPage('login');
    loginComponentsPage = new LoginComponentsPage();
    expect(await loginComponentsPage.title.getText()).to.match(/Logins/);

    expect(await loginComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([loginComponentsPage.noRecords, loginComponentsPage.table]);

    beforeRecordsCount = (await isVisible(loginComponentsPage.noRecords)) ? 0 : await getRecordsCount(loginComponentsPage.table);
  });

  it('should load create Login page', async () => {
    await loginComponentsPage.createButton.click();
    loginUpdatePage = new LoginUpdatePage();
    expect(await loginUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.login.home.createOrEditLabel/);
    await loginUpdatePage.cancel();
  });

  it('should create and save Logins', async () => {
    await loginComponentsPage.createButton.click();
    await loginUpdatePage.setUserNameInput('userName');
    expect(await loginUpdatePage.getUserNameInput()).to.match(/userName/);
    await loginUpdatePage.setPosswordInput('possword');
    expect(await loginUpdatePage.getPosswordInput()).to.match(/possword/);
    await loginUpdatePage.setTypeInput('type');
    expect(await loginUpdatePage.getTypeInput()).to.match(/type/);
    await waitUntilDisplayed(loginUpdatePage.saveButton);
    await loginUpdatePage.save();
    await waitUntilHidden(loginUpdatePage.saveButton);
    expect(await isVisible(loginUpdatePage.saveButton)).to.be.false;

    expect(await loginComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(loginComponentsPage.table);

    await waitUntilCount(loginComponentsPage.records, beforeRecordsCount + 1);
    expect(await loginComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Login', async () => {
    const deleteButton = loginComponentsPage.getDeleteButton(loginComponentsPage.records.last());
    await click(deleteButton);

    loginDeleteDialog = new LoginDeleteDialog();
    await waitUntilDisplayed(loginDeleteDialog.deleteModal);
    expect(await loginDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.login.delete.question/);
    await loginDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(loginDeleteDialog.deleteModal);

    expect(await isVisible(loginDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([loginComponentsPage.noRecords, loginComponentsPage.table]);

    const afterCount = (await isVisible(loginComponentsPage.noRecords)) ? 0 : await getRecordsCount(loginComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
