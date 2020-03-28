import { element, by, ElementFinder } from 'protractor';

export default class WorkUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.work.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameWorkInput: ElementFinder = element(by.css('input#work-nameWork'));
  priceHourInput: ElementFinder = element(by.css('input#work-priceHour'));
  numVacanciesInput: ElementFinder = element(by.css('input#work-numVacancies'));

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
