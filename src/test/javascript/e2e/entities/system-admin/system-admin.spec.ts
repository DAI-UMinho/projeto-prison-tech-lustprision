import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SystemAdminComponentsPage, { SystemAdminDeleteDialog } from './system-admin.page-object';
import SystemAdminUpdatePage from './system-admin-update.page-object';
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

describe('SystemAdmin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let systemAdminComponentsPage: SystemAdminComponentsPage;
  let systemAdminUpdatePage: SystemAdminUpdatePage;
  let systemAdminDeleteDialog: SystemAdminDeleteDialog;
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

  it('should load SystemAdmins', async () => {
    await navBarPage.getEntityPage('system-admin');
    systemAdminComponentsPage = new SystemAdminComponentsPage();
    expect(await systemAdminComponentsPage.title.getText()).to.match(/System Admins/);

    expect(await systemAdminComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([systemAdminComponentsPage.noRecords, systemAdminComponentsPage.table]);

    beforeRecordsCount = (await isVisible(systemAdminComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(systemAdminComponentsPage.table);
  });

  it('should load create SystemAdmin page', async () => {
    await systemAdminComponentsPage.createButton.click();
    systemAdminUpdatePage = new SystemAdminUpdatePage();
    expect(await systemAdminUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.systemAdmin.home.createOrEditLabel/);
    await systemAdminUpdatePage.cancel();
  });

  it('should create and save SystemAdmins', async () => {
    await systemAdminComponentsPage.createButton.click();
    await systemAdminUpdatePage.setIdSysAdminInput('5');
    expect(await systemAdminUpdatePage.getIdSysAdminInput()).to.eq('5');
    await systemAdminUpdatePage.setNameAdminInput('nameAdmin');
    expect(await systemAdminUpdatePage.getNameAdminInput()).to.match(/nameAdmin/);
    await systemAdminUpdatePage.setUserNameAdminInput('userNameAdmin');
    expect(await systemAdminUpdatePage.getUserNameAdminInput()).to.match(/userNameAdmin/);
    await systemAdminUpdatePage.setPasswordInput('password');
    expect(await systemAdminUpdatePage.getPasswordInput()).to.match(/password/);
    await systemAdminUpdatePage.setPermissionIdPermissionInput('5');
    expect(await systemAdminUpdatePage.getPermissionIdPermissionInput()).to.eq('5');
    await systemAdminUpdatePage.idPermissionSelectLastOption();
    await systemAdminUpdatePage.loginSelectLastOption();
    await waitUntilDisplayed(systemAdminUpdatePage.saveButton);
    await systemAdminUpdatePage.save();
    await waitUntilHidden(systemAdminUpdatePage.saveButton);
    expect(await isVisible(systemAdminUpdatePage.saveButton)).to.be.false;

    expect(await systemAdminComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(systemAdminComponentsPage.table);

    await waitUntilCount(systemAdminComponentsPage.records, beforeRecordsCount + 1);
    expect(await systemAdminComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SystemAdmin', async () => {
    const deleteButton = systemAdminComponentsPage.getDeleteButton(systemAdminComponentsPage.records.last());
    await click(deleteButton);

    systemAdminDeleteDialog = new SystemAdminDeleteDialog();
    await waitUntilDisplayed(systemAdminDeleteDialog.deleteModal);
    expect(await systemAdminDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.systemAdmin.delete.question/);
    await systemAdminDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(systemAdminDeleteDialog.deleteModal);

    expect(await isVisible(systemAdminDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([systemAdminComponentsPage.noRecords, systemAdminComponentsPage.table]);

    const afterCount = (await isVisible(systemAdminComponentsPage.noRecords)) ? 0 : await getRecordsCount(systemAdminComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
