import { element, by, ElementFinder } from 'protractor';

export default class QuestionUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.question.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  questionInput: ElementFinder = element(by.css('input#question-question'));
  valueInput: ElementFinder = element(by.css('input#question-value'));
  answerInput: ElementFinder = element(by.css('input#question-answer'));
  wrongAnswer1Input: ElementFinder = element(by.css('input#question-wrongAnswer1'));
  wrongAnswer2Input: ElementFinder = element(by.css('input#question-wrongAnswer2'));
  wrongAnswer3Input: ElementFinder = element(by.css('input#question-wrongAnswer3'));

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

  async setWrongAnswer1Input(wrongAnswer1) {
    await this.wrongAnswer1Input.sendKeys(wrongAnswer1);
  }

  async getWrongAnswer1Input() {
    return this.wrongAnswer1Input.getAttribute('value');
  }

  async setWrongAnswer2Input(wrongAnswer2) {
    await this.wrongAnswer2Input.sendKeys(wrongAnswer2);
  }

  async getWrongAnswer2Input() {
    return this.wrongAnswer2Input.getAttribute('value');
  }

  async setWrongAnswer3Input(wrongAnswer3) {
    await this.wrongAnswer3Input.sendKeys(wrongAnswer3);
  }

  async getWrongAnswer3Input() {
    return this.wrongAnswer3Input.getAttribute('value');
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
