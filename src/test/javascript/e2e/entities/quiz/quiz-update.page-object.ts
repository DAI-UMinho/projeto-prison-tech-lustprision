import { element, by, ElementFinder } from 'protractor';

export default class QuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.quiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  qtyQuestionInput: ElementFinder = element(by.css('input#quiz-qtyQuestion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQtyQuestionInput(qtyQuestion) {
    await this.qtyQuestionInput.sendKeys(qtyQuestion);
  }

  async getQtyQuestionInput() {
    return this.qtyQuestionInput.getAttribute('value');
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
