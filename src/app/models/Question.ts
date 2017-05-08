import {Answer} from "./Answer";
export class Question {
  id: Number;
  questionText: String;
  answers = [];
  testId: Number;

  constructor(testId) {
    this.id = 0;
    this.testId = testId;
    this.answers.push(new Answer());
  }
}
