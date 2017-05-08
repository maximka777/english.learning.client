import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {Question} from "../models/Question";

@Injectable()
export class QuestionsService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll(testId) {
    return this.http.get(`${this.config.API}/test-questions/${testId}`, {});
  }

  addQuestion(question: Question) {
    return this.http.post(`${this.config.API}/test-questions`, question);
  }

  remove(questionId) {
    return this.http.delete(`${this.config.API}/test-questions/${questionId}`, {});
  }
}

