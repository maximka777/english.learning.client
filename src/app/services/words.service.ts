import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {WordTheme} from "../models/WordTheme";

@Injectable()
export class WordsService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll(themeId) {
    return this.http.get(`${this.config.API}/words/${themeId}`, {});
  }

  createOne(word) {
    return this.http.post(`${this.config.API}/words`, word);
  }

  remove(wordId) {
    return this.http.delete(`${this.config.API}/words/${wordId}`, {});
  }
}
