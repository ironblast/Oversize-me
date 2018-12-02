import { browser, ExpectedConditions, $, ElementFinder, $$ } from 'protractor';

const timeout = 3000;

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  waitForList() {
    browser.wait(ExpectedConditions.presenceOf($('mat-card-content mat-list')), timeout);
  }

  getTodos() {
    return $$('mat-card-content mat-list-item');
  }

  getTodoAtPosition(id: number) {
    return $(`mat-card-content mat-list mat-list-item:nth-of-type(${id})`);
  }

  clickTodoCheckInput(todo: ElementFinder) {
    return todo.$('mat-checkbox').click();
  }

  todoIsCheck(todo : ElementFinder) {
    return todo.$('mat-checkbox-checked') !== null;
  }

  getParagraphText() {
    return $('app-root h1').getText();
  }
}
