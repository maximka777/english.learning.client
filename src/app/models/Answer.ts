export class Answer {
  id: Number;
  answerText: String;
  questionId: Number;
  isCorrect: Boolean;

  constructor() {
    this.id = 0;
    this.questionId = 0;
    this.answerText = '';
    this.isCorrect = false;
  }
}
