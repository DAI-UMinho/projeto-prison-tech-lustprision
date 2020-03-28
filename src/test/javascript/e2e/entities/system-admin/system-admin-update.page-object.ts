import { element, by, ElementFinder } from 'protractor';

export default class SystemAdminUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.systemAdmin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameAdminInput: ElementFinder = element(by.css('input#system-admin-nameAdmin'));
  passwordInput: ElementFinder = element(by.css('input#system-admin-password'));
  loginSelect: ElementFinder = element(by.css('select#system-admin-login'));
  permissionSelect: ElementFinder = element(by.css('select#system-admin-permission'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameAdminInput(nameAdmin) {
    await this.nameAdminInput.sendKeys(nameAdmin);
  }

  async getNameAdminInput() {
    return this.nameAdminInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async loginSelectLastOption() {
    await this.loginSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async loginSelectOption(option) {
    await this.loginSelect.sendKeys(option);
  }

  getLoginSelect() {
    return this.loginSelect;
  }

  async getLoginSelectedOption() {
    return this.loginSelect.element(by.css('option:checked')).getText();
  }

  async permissionSelectLastOption() {
    await this.permissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async permissionSelectOption(option) {
    await this.permissionSelect.sendKeys(option);
  }

  getPermissionSelect() {
    return this.permissionSelect;
  }

  async getPermissionSelectedOption() {
    return this.permissionSelect.element(by.css('option:checked')).getText();
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
