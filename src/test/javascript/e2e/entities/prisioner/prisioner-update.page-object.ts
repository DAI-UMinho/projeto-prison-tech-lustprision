import { element, by, ElementFinder } from 'protractor';

export default class PrisionerUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.prisioner.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#prisioner-name'));
  biInput: ElementFinder = element(by.css('input#prisioner-bi'));
  imageInput: ElementFinder = element(by.css('input#prisioner-image'));
  numPrisionerInput: ElementFinder = element(by.css('input#prisioner-numPrisioner'));
  numCellInput: ElementFinder = element(by.css('input#prisioner-numCell'));
  dataNascimentoInput: ElementFinder = element(by.css('input#prisioner-dataNascimento'));
  balanceInput: ElementFinder = element(by.css('input#prisioner-balance'));
  workingInput: ElementFinder = element(by.css('input#prisioner-working'));
  profileImageInput: ElementFinder = element(by.css('input#file_profileImage'));
  nfcCodeInput: ElementFinder = element(by.css('input#prisioner-nfcCode'));
  codigoCartaoInput: ElementFinder = element(by.css('input#prisioner-codigoCartao'));
  permissionSelect: ElementFinder = element(by.css('select#prisioner-permission'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setBiInput(bi) {
    await this.biInput.sendKeys(bi);
  }

  async getBiInput() {
    return this.biInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async setNumPrisionerInput(numPrisioner) {
    await this.numPrisionerInput.sendKeys(numPrisioner);
  }

  async getNumPrisionerInput() {
    return this.numPrisionerInput.getAttribute('value');
  }

  async setNumCellInput(numCell) {
    await this.numCellInput.sendKeys(numCell);
  }

  async getNumCellInput() {
    return this.numCellInput.getAttribute('value');
  }

  async setDataNascimentoInput(dataNascimento) {
    await this.dataNascimentoInput.sendKeys(dataNascimento);
  }

  async getDataNascimentoInput() {
    return this.dataNascimentoInput.getAttribute('value');
  }

  async setBalanceInput(balance) {
    await this.balanceInput.sendKeys(balance);
  }

  async getBalanceInput() {
    return this.balanceInput.getAttribute('value');
  }

  async setWorkingInput(working) {
    await this.workingInput.sendKeys(working);
  }

  async getWorkingInput() {
    return this.workingInput.getAttribute('value');
  }

  async setProfileImageInput(profileImage) {
    await this.profileImageInput.sendKeys(profileImage);
  }

  async getProfileImageInput() {
    return this.profileImageInput.getAttribute('value');
  }

  async setNfcCodeInput(nfcCode) {
    await this.nfcCodeInput.sendKeys(nfcCode);
  }

  async getNfcCodeInput() {
    return this.nfcCodeInput.getAttribute('value');
  }

  async setCodigoCartaoInput(codigoCartao) {
    await this.codigoCartaoInput.sendKeys(codigoCartao);
  }

  async getCodigoCartaoInput() {
    return this.codigoCartaoInput.getAttribute('value');
  }

  async permissionSelectLastOption() {
    await this.permissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async permissionSelectOption(option) {
    await this.permissionSelect.sendKeys(option);
  }

  getPermissionSelect() {
    return this.permissionSelect;
  }

  async getPermissionSelectedOption() {
    return this.permissionSelect.element(by.css('option:checked')).getText();
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
