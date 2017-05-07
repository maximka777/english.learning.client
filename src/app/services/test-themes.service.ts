import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {WordTheme} from "../models/WordTheme";
import {TestTheme} from "../models/TestTheme";

@Injectable()
export class TestThemesService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.config.API}/test-topics`, {});
  }

  createOne(theme: TestTheme) {
    return this.http.post(`${this.config.API}/test-topics`, theme);
  }

  getOne(themeId) {
    return this.http.get(`${this.config.API}/test-topics/${themeId}`, {});
  }

  remove(themeId) {
    return this.http.delete(`${this.config.API}/test-topics/${themeId}`, {});
  }
}
