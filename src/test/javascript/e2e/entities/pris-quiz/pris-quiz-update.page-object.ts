import { element, by, ElementFinder } from 'protractor';

export default class PrisQuizUpdatePage {
  pageTitle: ElementFinder = element(by.id('lustPrisionApp.prisQuiz.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quizDateInput: ElementFinder = element(by.css('input#pris-quiz-quizDate'));
  prisionerSelect: ElementFinder = element(by.css('select#pris-quiz-prisioner'));
  quizSelect: ElementFinder = element(by.css('select#pris-quiz-quiz'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuizDateInput(quizDate) {
    await this.quizDateInput.sendKeys(quizDate);
  }

  async getQuizDateInput() {
    return this.quizDateInput.getAttribute('value');
  }

  async prisionerSelectLastOption() {
    await this.prisionerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prisionerSelectOption(option) {
    await this.prisionerSelect.sendKeys(option);
  }

  getPrisionerSelect() {
    return this.prisionerSelect;
  }

  async getPrisionerSelectedOption() {
    return this.prisionerSelect.element(by.css('option:checked')).getText();
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
