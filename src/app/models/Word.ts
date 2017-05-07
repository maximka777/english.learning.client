export class Word {
  private id: Number;
  private russian: String;
  private english: String;
  private themeId: Number;

  constructor(themeId) {
    this.id = 0;
    this.themeId = themeId;
  }
}
