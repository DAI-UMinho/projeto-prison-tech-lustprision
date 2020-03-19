import { element, by, ElementFinder } from 'protractor';

export default class PrisQuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.prisQuiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idPrisionerInput: ElementFinder = element(by.css('input#pris-quiz-idPrisioner'));
  idQuizInput: ElementFinder = element(by.css('input#pris-quiz-idQuiz'));
  quizDateInput: ElementFinder = element(by.css('input#pris-quiz-quizDate'));
  idQuizSelect: ElementFinder = element(by.css('select#pris-quiz-idQuiz'));
  idPrisionerSelect: ElementFinder = element(by.css('select#pris-quiz-idPrisioner'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdPrisionerInput(idPrisioner) {
    await this.idPrisionerInput.sendKeys(idPrisioner);
  }

  async getIdPrisionerInput() {
    return this.idPrisionerInput.getAttribute('value');
  }

  async setIdQuizInput(idQuiz) {
    await this.idQuizInput.sendKeys(idQuiz);
  }

  async getIdQuizInput() {
    return this.idQuizInput.getAttribute('value');
  }

  async setQuizDateInput(quizDate) {
    await this.quizDateInput.sendKeys(quizDate);
  }

  async getQuizDateInput() {
    return this.quizDateInput.getAttribute('value');
  }

  async idQuizSelectLastOption() {
    await this.idQuizSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idQuizSelectOption(option) {
    await this.idQuizSelect.sendKeys(option);
  }

  getIdQuizSelect() {
    return this.idQuizSelect;
  }

  async getIdQuizSelectedOption() {
    return this.idQuizSelect.element(by.css('option:checked')).getText();
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
