import { AngularDatalistPage } from './app.po';

describe('angular-datalist App', () => {
  let page: AngularDatalistPage;

  beforeEach(() => {
    page = new AngularDatalistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
