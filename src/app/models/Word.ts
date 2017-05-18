export class Word {
  private id: Number;
  russian: String;
  english: String;
  private topicId: Number;

  constructor(topicId) {
    this.id = 0;
    this.topicId = +topicId;
    this.russian = '';
    this.english = '';
  }
}
