const moment = require('moment');

export class TestResult {
  id: Number;
  testId: Number;
  userId: Number;
  correctCount: Number;
  totalCount: Number;
  passDate: any;

  constructor(testId, userId, correctCount, totalCount) {
    this.id = 0;
    this.testId = testId;
    this.userId = userId;
    this.correctCount = correctCount;
    this.totalCount = totalCount;
    this.passDate = moment().unix();
  }
}
