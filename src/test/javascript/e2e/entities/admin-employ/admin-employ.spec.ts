import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AdminEmployComponentsPage, { AdminEmployDeleteDialog } from './admin-employ.page-object';
import AdminEmployUpdatePage from './admin-employ-update.page-object';
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

describe('AdminEmploy e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adminEmployComponentsPage: AdminEmployComponentsPage;
  let adminEmployUpdatePage: AdminEmployUpdatePage;
  let adminEmployDeleteDialog: AdminEmployDeleteDialog;
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

  it('should load AdminEmploys', async () => {
    await navBarPage.getEntityPage('admin-employ');
    adminEmployComponentsPage = new AdminEmployComponentsPage();
    expect(await adminEmployComponentsPage.title.getText()).to.match(/Admin Employs/);

    expect(await adminEmployComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([adminEmployComponentsPage.noRecords, adminEmployComponentsPage.table]);

    beforeRecordsCount = (await isVisible(adminEmployComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(adminEmployComponentsPage.table);
  });

  it('should load create AdminEmploy page', async () => {
    await adminEmployComponentsPage.createButton.click();
    adminEmployUpdatePage = new AdminEmployUpdatePage();
    expect(await adminEmployUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.adminEmploy.home.createOrEditLabel/);
    await adminEmployUpdatePage.cancel();
  });

  it('should create and save AdminEmploys', async () => {
    await adminEmployComponentsPage.createButton.click();
    await adminEmployUpdatePage.setIdAdminEmpInput('5');
    expect(await adminEmployUpdatePage.getIdAdminEmpInput()).to.eq('5');
    await adminEmployUpdatePage.setNameAdminEmpInput('nameAdminEmp');
    expect(await adminEmployUpdatePage.getNameAdminEmpInput()).to.match(/nameAdminEmp/);
    await adminEmployUpdatePage.setPasswordInput('password');
    expect(await adminEmployUpdatePage.getPasswordInput()).to.match(/password/);
    await adminEmployUpdatePage.loginSelectLastOption();
    await adminEmployUpdatePage.permissionSelectLastOption();
    await waitUntilDisplayed(adminEmployUpdatePage.saveButton);
    await adminEmployUpdatePage.save();
    await waitUntilHidden(adminEmployUpdatePage.saveButton);
    expect(await isVisible(adminEmployUpdatePage.saveButton)).to.be.false;

    expect(await adminEmployComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(adminEmployComponentsPage.table);

    await waitUntilCount(adminEmployComponentsPage.records, beforeRecordsCount + 1);
    expect(await adminEmployComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last AdminEmploy', async () => {
    const deleteButton = adminEmployComponentsPage.getDeleteButton(adminEmployComponentsPage.records.last());
    await click(deleteButton);

    adminEmployDeleteDialog = new AdminEmployDeleteDialog();
    await waitUntilDisplayed(adminEmployDeleteDialog.deleteModal);
    expect(await adminEmployDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.adminEmploy.delete.question/);
    await adminEmployDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(adminEmployDeleteDialog.deleteModal);

    expect(await isVisible(adminEmployDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([adminEmployComponentsPage.noRecords, adminEmployComponentsPage.table]);

    const afterCount = (await isVisible(adminEmployComponentsPage.noRecords)) ? 0 : await getRecordsCount(adminEmployComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
