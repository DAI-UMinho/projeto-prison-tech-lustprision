import { element, by, ElementFinder } from 'protractor';

export default class PressWorkUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.pressWork.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  prisionerIdInput: ElementFinder = element(by.css('input#press-work-prisionerId'));
  workIdInput: ElementFinder = element(by.css('input#press-work-workId'));
  idWorkSelect: ElementFinder = element(by.css('select#press-work-idWork'));
  prisionerSelect: ElementFinder = element(by.css('select#press-work-prisioner'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPrisionerIdInput(prisionerId) {
    await this.prisionerIdInput.sendKeys(prisionerId);
  }

  async getPrisionerIdInput() {
    return this.prisionerIdInput.getAttribute('value');
  }

  async setWorkIdInput(workId) {
    await this.workIdInput.sendKeys(workId);
  }

  async getWorkIdInput() {
    return this.workIdInput.getAttribute('value');
  }

  async idWorkSelectLastOption() {
    await this.idWorkSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idWorkSelectOption(option) {
    await this.idWorkSelect.sendKeys(option);
  }

  getIdWorkSelect() {
    return this.idWorkSelect;
  }

  async getIdWorkSelectedOption() {
    return this.idWorkSelect.element(by.css('option:checked')).getText();
  }

  async prisionerSelectLastOption() {
    await this.prisionerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prisionerSelectOption(option) {
    await this.prisionerSelect.sendKeys(option);
  }

  getPrisionerSelect() {
    return this.prisionerSelect;
  }

  async getPrisionerSelectedOption() {
    return this.prisionerSelect.element(by.css('option:checked')).getText();
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
