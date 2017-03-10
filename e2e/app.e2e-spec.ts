import { VirtualgradePage } from './app.po';

describe('virtualgrade App', () => {
  let page: VirtualgradePage;

  beforeEach(() => {
    page = new VirtualgradePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
