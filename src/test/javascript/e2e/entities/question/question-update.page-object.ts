import { element, by, ElementFinder } from 'protractor';

export default class QuestionUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.question.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  questionInput: ElementFinder = element(by.css('input#question-question'));
  valueInput: ElementFinder = element(by.css('input#question-value'));
  answerInput: ElementFinder = element(by.css('input#question-answer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuestionInput(question) {
    await this.questionInput.sendKeys(question);
  }

  async getQuestionInput() {
    return this.questionInput.getAttribute('value');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async setAnswerInput(answer) {
    await this.answerInput.sendKeys(answer);
  }

  async getAnswerInput() {
    return this.answerInput.getAttribute('value');
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
