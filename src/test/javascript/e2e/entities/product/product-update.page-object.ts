import { element, by, ElementFinder } from 'protractor';

export default class ProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.product.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeProdInput: ElementFinder = element(by.css('input#product-codeProd'));
  productLinIdInput: ElementFinder = element(by.css('input#product-productLinId'));
  nameProdInput: ElementFinder = element(by.css('input#product-nameProd'));
  priceInput: ElementFinder = element(by.css('input#product-price'));
  selerInput: ElementFinder = element(by.css('input#product-seler'));
  descriptionProdInput: ElementFinder = element(by.css('input#product-descriptionProd'));
  quantyInStockInput: ElementFinder = element(by.css('input#product-quantyInStock'));
  buyPriceInput: ElementFinder = element(by.css('input#product-buyPrice'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeProdInput(codeProd) {
    await this.codeProdInput.sendKeys(codeProd);
  }

  async getCodeProdInput() {
    return this.codeProdInput.getAttribute('value');
  }

  async setProductLinIdInput(productLinId) {
    await this.productLinIdInput.sendKeys(productLinId);
  }

  async getProductLinIdInput() {
    return this.productLinIdInput.getAttribute('value');
  }

  async setNameProdInput(nameProd) {
    await this.nameProdInput.sendKeys(nameProd);
  }

  async getNameProdInput() {
    return this.nameProdInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setSelerInput(seler) {
    await this.selerInput.sendKeys(seler);
  }

  async getSelerInput() {
    return this.selerInput.getAttribute('value');
  }

  async setDescriptionProdInput(descriptionProd) {
    await this.descriptionProdInput.sendKeys(descriptionProd);
  }

  async getDescriptionProdInput() {
    return this.descriptionProdInput.getAttribute('value');
  }

  async setQuantyInStockInput(quantyInStock) {
    await this.quantyInStockInput.sendKeys(quantyInStock);
  }

  async getQuantyInStockInput() {
    return this.quantyInStockInput.getAttribute('value');
  }

  async setBuyPriceInput(buyPrice) {
    await this.buyPriceInput.sendKeys(buyPrice);
  }

  async getBuyPriceInput() {
    return this.buyPriceInput.getAttribute('value');
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
