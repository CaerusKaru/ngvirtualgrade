import { browser, by, element } from 'protractor';

export class NgvirtualgradePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vg-root h1')).getText();
  }
}
