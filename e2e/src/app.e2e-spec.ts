import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Oversize me !');
  });

  it('should list my currents todos', () => {
    page.navigateTo();
    page.waitForList();
    expect(page.getTodos());
  });
});
