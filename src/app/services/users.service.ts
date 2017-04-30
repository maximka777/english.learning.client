import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: Http) { }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.config.API}/users`)
        .map(res => res.json())
        .subscribe((users) => {
          resolve(users.data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
