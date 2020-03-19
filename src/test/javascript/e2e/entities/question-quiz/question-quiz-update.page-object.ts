import { element, by, ElementFinder } from 'protractor';

export default class QuestionQuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.questionQuiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  questionQuizIdInput: ElementFinder = element(by.css('input#question-quiz-questionQuizId'));
  idQuizInput: ElementFinder = element(by.css('input#question-quiz-idQuiz'));
  idQuestionInput: ElementFinder = element(by.css('input#question-quiz-idQuestion'));
  idQuizSelect: ElementFinder = element(by.css('select#question-quiz-idQuiz'));
  idQuestionSelect: ElementFinder = element(by.css('select#question-quiz-idQuestion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuestionQuizIdInput(questionQuizId) {
    await this.questionQuizIdInput.sendKeys(questionQuizId);
  }

  async getQuestionQuizIdInput() {
    return this.questionQuizIdInput.getAttribute('value');
  }

  async setIdQuizInput(idQuiz) {
    await this.idQuizInput.sendKeys(idQuiz);
  }

  async getIdQuizInput() {
    return this.idQuizInput.getAttribute('value');
  }

  async setIdQuestionInput(idQuestion) {
    await this.idQuestionInput.sendKeys(idQuestion);
  }

  async getIdQuestionInput() {
    return this.idQuestionInput.getAttribute('value');
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

  async idQuestionSelectLastOption() {
    await this.idQuestionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idQuestionSelectOption(option) {
    await this.idQuestionSelect.sendKeys(option);
  }

  getIdQuestionSelect() {
    return this.idQuestionSelect;
  }

  async getIdQuestionSelectedOption() {
    return this.idQuestionSelect.element(by.css('option:checked')).getText();
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
