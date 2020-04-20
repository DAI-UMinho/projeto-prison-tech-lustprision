import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StateComponentsPage from './state.page-object';
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

describe('State e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stateComponentsPage: StateComponentsPage;
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

  it('should load States', async () => {
    await navBarPage.getEntityPage('state');
    stateComponentsPage = new StateComponentsPage();
    expect(await stateComponentsPage.title.getText()).to.match(/States/);

    await waitUntilAnyDisplayed([stateComponentsPage.noRecords, stateComponentsPage.table]);

    beforeRecordsCount = (await isVisible(stateComponentsPage.noRecords)) ? 0 : await getRecordsCount(stateComponentsPage.table);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
