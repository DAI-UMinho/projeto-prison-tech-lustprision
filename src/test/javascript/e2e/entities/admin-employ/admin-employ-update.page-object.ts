import { element, by, ElementFinder } from 'protractor';

export default class AdminEmployUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.adminEmploy.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idAdminEmpInput: ElementFinder = element(by.css('input#admin-employ-idAdminEmp'));
  nameAdminEmpInput: ElementFinder = element(by.css('input#admin-employ-nameAdminEmp'));
  loginUserNameInput: ElementFinder = element(by.css('input#admin-employ-loginUserName'));
  passwordInput: ElementFinder = element(by.css('input#admin-employ-password'));
  permissionIdPermissionInput: ElementFinder = element(by.css('input#admin-employ-permissionIdPermission'));
  idPermissionSelect: ElementFinder = element(by.css('select#admin-employ-idPermission'));
  loginSelect: ElementFinder = element(by.css('select#admin-employ-login'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdAdminEmpInput(idAdminEmp) {
    await this.idAdminEmpInput.sendKeys(idAdminEmp);
  }

  async getIdAdminEmpInput() {
    return this.idAdminEmpInput.getAttribute('value');
  }

  async setNameAdminEmpInput(nameAdminEmp) {
    await this.nameAdminEmpInput.sendKeys(nameAdminEmp);
  }

  async getNameAdminEmpInput() {
    return this.nameAdminEmpInput.getAttribute('value');
  }

  async setLoginUserNameInput(loginUserName) {
    await this.loginUserNameInput.sendKeys(loginUserName);
  }

  async getLoginUserNameInput() {
    return this.loginUserNameInput.getAttribute('value');
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
