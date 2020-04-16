import { element, by, ElementFinder } from 'protractor';

export default class PurchaseUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.purchase.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#purchase-date'));
  purchaseTotalInput: ElementFinder = element(by.css('input#purchase-purchaseTotal'));
  prisionerSelect: ElementFinder = element(by.css('select#purchase-prisioner'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setPurchaseTotalInput(purchaseTotal) {
    await this.purchaseTotalInput.sendKeys(purchaseTotal);
  }

  async getPurchaseTotalInput() {
    return this.purchaseTotalInput.getAttribute('value');
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
