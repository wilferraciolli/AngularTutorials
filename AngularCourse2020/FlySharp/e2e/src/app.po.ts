import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getNumTableRows() {
    return (element.all(by.css('table tbody tr'))).count();
  }

  getNumTableCols() {
    return (element(by.css('table tbody tr')).all(by.css('td'))).count();
  }
  clickToggle() {
    element(by.css('#toggle')).click();
  }

  getTableCellData(row: string, col: string) {
    const query: string = 'table tr:nth-child(' + row + ') td:nth-child(' + col + ')';
    console.log('QUERY: ' + query);
    return element(by.css(query)).getText();
  }
}
