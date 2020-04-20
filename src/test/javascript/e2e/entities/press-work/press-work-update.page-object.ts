import { element, by, ElementFinder } from 'protractor';

export default class PressWorkUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.pressWork.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  workDateInput: ElementFinder = element(by.css('input#press-work-workDate'));
  prisionerSelect: ElementFinder = element(by.css('select#press-work-prisioner'));
  workSelect: ElementFinder = element(by.css('select#press-work-work'));
  stateSelect: ElementFinder = element(by.css('select#press-work-state'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWorkDateInput(workDate) {
    await this.workDateInput.sendKeys(workDate);
  }

  async getWorkDateInput() {
    return this.workDateInput.getAttribute('value');
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

  async workSelectLastOption() {
    await this.workSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async workSelectOption(option) {
    await this.workSelect.sendKeys(option);
  }

  getWorkSelect() {
    return this.workSelect;
  }

  async getWorkSelectedOption() {
    return this.workSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stateSelectOption(option) {
    await this.stateSelect.sendKeys(option);
  }

  getStateSelect() {
    return this.stateSelect;
  }

  async getStateSelectedOption() {
    return this.stateSelect.element(by.css('option:checked')).getText();
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
