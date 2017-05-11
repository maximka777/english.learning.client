import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "../utils/HttpClient";
import {APP_CONFIG} from "../configs/app.config";

@Injectable()
export class UsersService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.config.API}/users`, {});
  }

  register(registerData) {
    return this.http.post(`${this.config.API}/users`, registerData);
  }
}
