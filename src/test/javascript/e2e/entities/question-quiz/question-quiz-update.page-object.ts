import { element, by, ElementFinder } from 'protractor';

export default class QuestionQuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.questionQuiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  questionQuizIdInput: ElementFinder = element(by.css('input#question-quiz-questionQuizId'));
  quizSelect: ElementFinder = element(by.css('select#question-quiz-quiz'));
  questionSelect: ElementFinder = element(by.css('select#question-quiz-question'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuestionQuizIdInput(questionQuizId) {
    await this.questionQuizIdInput.sendKeys(questionQuizId);
  }

  async getQuestionQuizIdInput() {
    return this.questionQuizIdInput.getAttribute('value');
  }

  async quizSelectLastOption() {
    await this.quizSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async quizSelectOption(option) {
    await this.quizSelect.sendKeys(option);
  }

  getQuizSelect() {
    return this.quizSelect;
  }

  async getQuizSelectedOption() {
    return this.quizSelect.element(by.css('option:checked')).getText();
  }

  async questionSelectLastOption() {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option) {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect() {
    return this.questionSelect;
  }

  async getQuestionSelectedOption() {
    return this.questionSelect.element(by.css('option:checked')).getText();
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
