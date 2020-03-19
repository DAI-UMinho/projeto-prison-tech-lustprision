import { element, by, ElementFinder } from 'protractor';

export default class SystemAdminUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.systemAdmin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idSysAdminInput: ElementFinder = element(by.css('input#system-admin-idSysAdmin'));
  nameAdminInput: ElementFinder = element(by.css('input#system-admin-nameAdmin'));
  userNameAdminInput: ElementFinder = element(by.css('input#system-admin-userNameAdmin'));
  passwordInput: ElementFinder = element(by.css('input#system-admin-password'));
  permissionIdPermissionInput: ElementFinder = element(by.css('input#system-admin-permissionIdPermission'));
  idPermissionSelect: ElementFinder = element(by.css('select#system-admin-idPermission'));
  loginSelect: ElementFinder = element(by.css('select#system-admin-login'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdSysAdminInput(idSysAdmin) {
    await this.idSysAdminInput.sendKeys(idSysAdmin);
  }

  async getIdSysAdminInput() {
    return this.idSysAdminInput.getAttribute('value');
  }

  async setNameAdminInput(nameAdmin) {
    await this.nameAdminInput.sendKeys(nameAdmin);
  }

  async getNameAdminInput() {
    return this.nameAdminInput.getAttribute('value');
  }

  async setUserNameAdminInput(userNameAdmin) {
    await this.userNameAdminInput.sendKeys(userNameAdmin);
  }

  async getUserNameAdminInput() {
    return this.userNameAdminInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async setPermissionIdPermissionInput(permissionIdPermission) {
    await this.permissionIdPermissionInput.sendKeys(permissionIdPermission);
  }

  async getPermissionIdPermissionInput() {
    return this.permissionIdPermissionInput.getAttribute('value');
  }

  async idPermissionSelectLastOption() {
    await this.idPermissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idPermissionSelectOption(option) {
    await this.idPermissionSelect.sendKeys(option);
  }

  getIdPermissionSelect() {
    return this.idPermissionSelect;
  }

  async getIdPermissionSelectedOption() {
    return this.idPermissionSelect.element(by.css('option:checked')).getText();
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
