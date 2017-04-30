import { EnglishLearningClientPage } from './app.po';

describe('english-learning-client App', () => {
  let page: EnglishLearningClientPage;

  beforeEach(() => {
    page = new EnglishLearningClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
