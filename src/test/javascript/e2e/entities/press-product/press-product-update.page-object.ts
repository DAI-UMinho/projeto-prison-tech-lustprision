import { element, by, ElementFinder } from 'protractor';

export default class PressProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.pressProduct.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  qtyInput: ElementFinder = element(by.css('input#press-product-qty'));
  priceEachInput: ElementFinder = element(by.css('input#press-product-priceEach'));
  purchaseSelect: ElementFinder = element(by.css('select#press-product-purchase'));
  productSelect: ElementFinder = element(by.css('select#press-product-product'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQtyInput(qty) {
    await this.qtyInput.sendKeys(qty);
  }

  async getQtyInput() {
    return this.qtyInput.getAttribute('value');
  }

  async setPriceEachInput(priceEach) {
    await this.priceEachInput.sendKeys(priceEach);
  }

  async getPriceEachInput() {
    return this.priceEachInput.getAttribute('value');
  }

  async purchaseSelectLastOption() {
    await this.purchaseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async purchaseSelectOption(option) {
    await this.purchaseSelect.sendKeys(option);
  }

  getPurchaseSelect() {
    return this.purchaseSelect;
  }

  async getPurchaseSelectedOption() {
    return this.purchaseSelect.element(by.css('option:checked')).getText();
  }

  async productSelectLastOption() {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect() {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return this.productSelect.element(by.css('option:checked')).getText();
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
