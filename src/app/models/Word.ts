export class Word {
  private id: Number;
  private russian: String;
  private english: String;
  private topicId: Number;

  constructor(topicId) {
    this.id = 0;
    this.topicId = +topicId;
  }
}
