import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";

@Injectable()
export class TestsService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll(themeId) {
    return this.http.get(`${this.config.API}/tests/theme/${themeId}`, {});
  }

  getOne(testId) {
    return this.http.get(`${this.config.API}/tests/${testId}`, {});
  }

  createOne(test) {
    return this.http.post(`${this.config.API}/tests`, test);
  }

  remove(testId) {
    return this.http.delete(`${this.config.API}/tests/${testId}`, {});
  }
}

