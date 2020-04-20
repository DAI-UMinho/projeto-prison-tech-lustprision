import { element, by, ElementFinder } from 'protractor';

export default class WorkUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.work.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameWorkInput: ElementFinder = element(by.css('input#work-nameWork'));
  priceHourInput: ElementFinder = element(by.css('input#work-priceHour'));
  numVacanciesInput: ElementFinder = element(by.css('input#work-numVacancies'));
  dateInput: ElementFinder = element(by.css('input#work-date'));
  stateSelect: ElementFinder = element(by.css('select#work-state'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameWorkInput(nameWork) {
    await this.nameWorkInput.sendKeys(nameWork);
  }

  async getNameWorkInput() {
    return this.nameWorkInput.getAttribute('value');
  }

  async setPriceHourInput(priceHour) {
    await this.priceHourInput.sendKeys(priceHour);
  }

  async getPriceHourInput() {
    return this.priceHourInput.getAttribute('value');
  }

  async setNumVacanciesInput(numVacancies) {
    await this.numVacanciesInput.sendKeys(numVacancies);
  }

  async getNumVacanciesInput() {
    return this.numVacanciesInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
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
