const moment = require('moment');

export class TestResult {
  id: Number;
  testId: Number;
  userId: Number;
  correctCount: Number;
  passDate: any;

  constructor(testId, userId, correctCount) {
    this.id = 0;
    this.testId = testId;
    this.userId = userId;
    this.correctCount = correctCount;
    this.passDate = moment().unix();
  }
}
