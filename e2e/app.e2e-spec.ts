import { NgvirtualgradePage } from './app.po';

describe('ngvirtualgrade App', () => {
  let page: NgvirtualgradePage;

  beforeEach(() => {
    page = new NgvirtualgradePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to vg!!');
  });
});
