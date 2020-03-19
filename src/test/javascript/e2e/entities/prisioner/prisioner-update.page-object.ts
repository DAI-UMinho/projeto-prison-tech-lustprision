import { element, by, ElementFinder } from 'protractor';

export default class PrisionerUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.prisioner.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idPrisionerInput: ElementFinder = element(by.css('input#prisioner-idPrisioner'));
  nameInput: ElementFinder = element(by.css('input#prisioner-name'));
  biInput: ElementFinder = element(by.css('input#prisioner-bi'));
  imageInput: ElementFinder = element(by.css('input#prisioner-image'));
  numPrisionerInput: ElementFinder = element(by.css('input#prisioner-numPrisioner'));
  numCellInput: ElementFinder = element(by.css('input#prisioner-numCell'));
  dataNascimentoInput: ElementFinder = element(by.css('input#prisioner-dataNascimento'));
  balanceInput: ElementFinder = element(by.css('input#prisioner-balance'));
  loginUserNameInput: ElementFinder = element(by.css('input#prisioner-loginUserName'));
  permissinidPermissionInput: ElementFinder = element(by.css('input#prisioner-permissinidPermission'));
  workingInput: ElementFinder = element(by.css('input#prisioner-working'));
  passwordInput: ElementFinder = element(by.css('input#prisioner-password'));
  idPermissionSelect: ElementFinder = element(by.css('select#prisioner-idPermission'));
  loginSelect: ElementFinder = element(by.css('select#prisioner-login'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdPrisionerInput(idPrisioner) {
    await this.idPrisionerInput.sendKeys(idPrisioner);
  }

  async getIdPrisionerInput() {
    return this.idPrisionerInput.getAttribute('value');
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

  async setLoginUserNameInput(loginUserName) {
    await this.loginUserNameInput.sendKeys(loginUserName);
  }

  async getLoginUserNameInput() {
    return this.loginUserNameInput.getAttribute('value');
  }

  async setPermissinidPermissionInput(permissinidPermission) {
    await this.permissinidPermissionInput.sendKeys(permissinidPermission);
  }

  async getPermissinidPermissionInput() {
    return this.permissinidPermissionInput.getAttribute('value');
  }

  async setWorkingInput(working) {
    await this.workingInput.sendKeys(working);
  }

  async getWorkingInput() {
    return this.workingInput.getAttribute('value');
  }

  async setPasswordInput(password) {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  async idPermissionSelectLastOption() {
    await this.idPermissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idPermissionSelectOption(option) {
    await this.idPermissionSelect.sendKeys(option);
  }

  getIdPermissionSelect() {
    return this.idPermissionSelect;
  }

  async getIdPermissionSelectedOption() {
    return this.idPermissionSelect.element(by.css('option:checked')).getText();
  }

  async loginSelectLastOption() {
    await this.loginSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async loginSelectOption(option) {
    await this.loginSelect.sendKeys(option);
  }

  getLoginSelect() {
    return this.loginSelect;
  }

  async getLoginSelectedOption() {
    return this.loginSelect.element(by.css('option:checked')).getText();
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
