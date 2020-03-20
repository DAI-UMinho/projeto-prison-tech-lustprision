import { element, by, ElementFinder } from 'protractor';

export default class LoginUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.login.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userNameInput: ElementFinder = element(by.css('input#login-userName'));
  passwordInput: ElementFinder = element(by.css('input#login-password'));
  typeInput: ElementFinder = element(by.css('input#login-type'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserNameInput(userName) {
    await this.userNameInput.sendKeys(userName);
  }

  async getUserNameInput() {
    return this.userNameInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
