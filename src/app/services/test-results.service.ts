import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {TestResult} from "../models/TestResult";

@Injectable()
export class TestResultsService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll(userId) {
    return this.http.get(`${this.config.API}/test-results/${userId}`, {});
  }

  createOne(testResult: TestResult) {
    return this.http.post(`${this.config.API}/test-results`, testResult);
  }
}
