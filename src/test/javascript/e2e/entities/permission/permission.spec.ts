import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PermissionComponentsPage, { PermissionDeleteDialog } from './permission.page-object';
import PermissionUpdatePage from './permission-update.page-object';
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

describe('Permission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let permissionComponentsPage: PermissionComponentsPage;
  let permissionUpdatePage: PermissionUpdatePage;
  let permissionDeleteDialog: PermissionDeleteDialog;
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

  it('should load Permissions', async () => {
    await navBarPage.getEntityPage('permission');
    permissionComponentsPage = new PermissionComponentsPage();
    expect(await permissionComponentsPage.title.getText()).to.match(/Permissions/);

    expect(await permissionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([permissionComponentsPage.noRecords, permissionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(permissionComponentsPage.noRecords)) ? 0 : await getRecordsCount(permissionComponentsPage.table);
  });

  it('should load create Permission page', async () => {
    await permissionComponentsPage.createButton.click();
    permissionUpdatePage = new PermissionUpdatePage();
    expect(await permissionUpdatePage.getPageTitle().getAttribute('id')).to.match(/lustPrisionApp.permission.home.createOrEditLabel/);
    await permissionUpdatePage.cancel();
  });

  it('should create and save Permissions', async () => {
    await permissionComponentsPage.createButton.click();
    await permissionUpdatePage.setIdPremissinInput('5');
    expect(await permissionUpdatePage.getIdPremissinInput()).to.eq('5');
    await permissionUpdatePage.setDescPermissionInput('descPermission');
    expect(await permissionUpdatePage.getDescPermissionInput()).to.match(/descPermission/);
    await waitUntilDisplayed(permissionUpdatePage.saveButton);
    await permissionUpdatePage.save();
    await waitUntilHidden(permissionUpdatePage.saveButton);
    expect(await isVisible(permissionUpdatePage.saveButton)).to.be.false;

    expect(await permissionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(permissionComponentsPage.table);

    await waitUntilCount(permissionComponentsPage.records, beforeRecordsCount + 1);
    expect(await permissionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Permission', async () => {
    const deleteButton = permissionComponentsPage.getDeleteButton(permissionComponentsPage.records.last());
    await click(deleteButton);

    permissionDeleteDialog = new PermissionDeleteDialog();
    await waitUntilDisplayed(permissionDeleteDialog.deleteModal);
    expect(await permissionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/lustPrisionApp.permission.delete.question/);
    await permissionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(permissionDeleteDialog.deleteModal);

    expect(await isVisible(permissionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([permissionComponentsPage.noRecords, permissionComponentsPage.table]);

    const afterCount = (await isVisible(permissionComponentsPage.noRecords)) ? 0 : await getRecordsCount(permissionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
