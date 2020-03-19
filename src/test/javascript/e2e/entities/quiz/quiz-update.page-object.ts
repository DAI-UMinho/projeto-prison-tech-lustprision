import { element, by, ElementFinder } from 'protractor';

export default class QuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.quiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idQuizInput: ElementFinder = element(by.css('input#quiz-idQuiz'));
  questQuizIdInput: ElementFinder = element(by.css('input#quiz-questQuizId'));
  qtyQuestionInput: ElementFinder = element(by.css('input#quiz-qtyQuestion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdQuizInput(idQuiz) {
    await this.idQuizInput.sendKeys(idQuiz);
  }

  async getIdQuizInput() {
    return this.idQuizInput.getAttribute('value');
  }

  async setQuestQuizIdInput(questQuizId) {
    await this.questQuizIdInput.sendKeys(questQuizId);
  }

  async getQuestQuizIdInput() {
    return this.questQuizIdInput.getAttribute('value');
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
