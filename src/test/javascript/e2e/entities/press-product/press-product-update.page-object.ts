import { element, by, ElementFinder } from 'protractor';

export default class PressProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.pressProduct.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  orderIdInput: ElementFinder = element(by.css('input#press-product-orderId'));
  productCodeInput: ElementFinder = element(by.css('input#press-product-productCode'));
  quatyInput: ElementFinder = element(by.css('input#press-product-quaty'));
  priceEachInput: ElementFinder = element(by.css('input#press-product-priceEach'));
  purchaseIdPurchaseInput: ElementFinder = element(by.css('input#press-product-purchaseIdPurchase'));
  idPrisionerSelect: ElementFinder = element(by.css('select#press-product-idPrisioner'));
  idProductSelect: ElementFinder = element(by.css('select#press-product-idProduct'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setOrderIdInput(orderId) {
    await this.orderIdInput.sendKeys(orderId);
  }

  async getOrderIdInput() {
    return this.orderIdInput.getAttribute('value');
  }

  async setProductCodeInput(productCode) {
    await this.productCodeInput.sendKeys(productCode);
  }

  async getProductCodeInput() {
    return this.productCodeInput.getAttribute('value');
  }

  async setQuatyInput(quaty) {
    await this.quatyInput.sendKeys(quaty);
  }

  async getQuatyInput() {
    return this.quatyInput.getAttribute('value');
  }

  async setPriceEachInput(priceEach) {
    await this.priceEachInput.sendKeys(priceEach);
  }

  async getPriceEachInput() {
    return this.priceEachInput.getAttribute('value');
  }

  async setPurchaseIdPurchaseInput(purchaseIdPurchase) {
    await this.purchaseIdPurchaseInput.sendKeys(purchaseIdPurchase);
  }

  async getPurchaseIdPurchaseInput() {
    return this.purchaseIdPurchaseInput.getAttribute('value');
  }

  async idPrisionerSelectLastOption() {
    await this.idPrisionerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idPrisionerSelectOption(option) {
    await this.idPrisionerSelect.sendKeys(option);
  }

  getIdPrisionerSelect() {
    return this.idPrisionerSelect;
  }

  async getIdPrisionerSelectedOption() {
    return this.idPrisionerSelect.element(by.css('option:checked')).getText();
  }

  async idProductSelectLastOption() {
    await this.idProductSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idProductSelectOption(option) {
    await this.idProductSelect.sendKeys(option);
  }

  getIdProductSelect() {
    return this.idProductSelect;
  }

  async getIdProductSelectedOption() {
    return this.idProductSelect.element(by.css('option:checked')).getText();
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
