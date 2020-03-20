import { element, by, ElementFinder } from 'protractor';

export default class PermissionUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.permission.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idPermissionInput: ElementFinder = element(by.css('input#permission-idPermission'));
  descPermissionInput: ElementFinder = element(by.css('input#permission-descPermission'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdPermissionInput(idPermission) {
    await this.idPermissionInput.sendKeys(idPermission);
  }

  async getIdPermissionInput() {
    return this.idPermissionInput.getAttribute('value');
  }

  async setDescPermissionInput(descPermission) {
    await this.descPermissionInput.sendKeys(descPermission);
  }

  async getDescPermissionInput() {
    return this.descPermissionInput.getAttribute('value');
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
