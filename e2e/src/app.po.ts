import { browser, by, element, ExpectedConditions } from 'protractor';

const timeout = 3000;

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  waitForList() {
    browser.wait(ExpectedConditions.presenceOf(element(by.css('mat-card-content mat-list'))), timeout);
  }

  getTodos() {
    return element.all(by.css('mat-card-content mat-list-item'));
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
