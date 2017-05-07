import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {WordTheme} from "../models/WordTheme";

@Injectable()
export class WordThemesService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.config.API}/word-topics`, {});
  }

  createOne(theme: WordTheme) {
    return this.http.post(`${this.config.API}/word-topics`, theme);
  }

  getOne(themeId) {
    return this.http.get(`${this.config.API}/word-topics/${themeId}`, {});
  }

  remove(themeId) {
    return this.http.delete(`${this.config.API}/word-topics/${themeId}`, {});
  }
}
