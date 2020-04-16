import { element, by, ElementFinder } from 'protractor';

export default class AdminEmployUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.adminEmploy.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameAdminEmpInput: ElementFinder = element(by.css('input#admin-employ-nameAdminEmp'));
  emailInput: ElementFinder = element(by.css('input#admin-employ-email'));
  activatedInput: ElementFinder = element(by.css('input#admin-employ-activated'));
  actitionKeyInput: ElementFinder = element(by.css('input#admin-employ-actitionKey'));
  resetKeyInput: ElementFinder = element(by.css('input#admin-employ-resetKey'));
  resetDateInput: ElementFinder = element(by.css('input#admin-employ-resetDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameAdminEmpInput(nameAdminEmp) {
    await this.nameAdminEmpInput.sendKeys(nameAdminEmp);
  }

  async getNameAdminEmpInput() {
    return this.nameAdminEmpInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
  }
  async setActitionKeyInput(actitionKey) {
    await this.actitionKeyInput.sendKeys(actitionKey);
  }

  async getActitionKeyInput() {
    return this.actitionKeyInput.getAttribute('value');
  }

  async setResetKeyInput(resetKey) {
    await this.resetKeyInput.sendKeys(resetKey);
  }

  async getResetKeyInput() {
    return this.resetKeyInput.getAttribute('value');
  }

  async setResetDateInput(resetDate) {
    await this.resetDateInput.sendKeys(resetDate);
  }

  async getResetDateInput() {
    return this.resetDateInput.getAttribute('value');
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
